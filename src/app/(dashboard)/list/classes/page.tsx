import FormModal from "@/src/components/FormModal";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import TableSearch from "@/src/components/TableSearch";
import { Class, Teacher } from "@/src/generated/prisma";
import { getUserInfo } from "@/src/lib/getUserRole";
import { prisma } from "@/src/lib/prisma";
import { ITEM_PER_PAGE } from "@/src/lib/utils";
import Image from "next/image";

type ClassList = Class & { supervisor: Teacher };

const ClassesListPage = async ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string };
}) => {
  const { role, userId: currentId } = await getUserInfo();

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden lg:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#f2f1ff]"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisor?.name + " " + item.supervisor?.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table={"class"} type={"update"} data={item} />
              <FormModal table={"class"} type={"delete"} id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS RULES

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.OR = [
              {
                name: { contains: value, mode: "insensitive" },
              },
              {
                supervisor: {
                  is: {
                    name: { contains: value, mode: "insensitive" },
                  },
                },
              },
              {
                supervisor: {
                  is: {
                    surname: { contains: value, mode: "insensitive" },
                  },
                },
              },
            ];
            break;

          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.class.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold hidden md:block ">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table={"class"} type={"create"} />}
          </div>
        </div>
      </div>

      <div>
        <Table columns={columns} renderRow={renderRow} data={data} />
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default ClassesListPage;
