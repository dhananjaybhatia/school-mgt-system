import FormModal from "@/src/components/FormModal";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import TableSearch from "@/src/components/TableSearch";
import { Prisma, Student } from "@/src/generated/prisma";
import { getUserInfo } from "@/src/lib/getUserRole";
import { prisma } from "@/src/lib/prisma";
import { ITEM_PER_PAGE } from "@/src/lib/utils";
import Image from "next/image";

type ParentList = Parent & { students: Student[] };

const ParentsListPage = async ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string };
}) => {
  const { role, userId } = await getUserInfo();

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
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

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#f2f1ff]"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student: Student) => student.name).join(", ")}
      </td>

      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table={"parent"} type={"update"} data={item} />
              <FormModal table={"parent"} type={"delete"} id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS RULES

  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive", // case-insensitive search
            };
            break;

          // You can add more filters here in future
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.parent.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold hidden md:block ">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table={"parent"} type={"create"} />}
          </div>
        </div>
      </div>

      <div>
        <Table columns={columns} renderRow={renderRow} data={data} />
        <Pagination count={count} page={p} />
      </div>
    </div>
  );
};

export default ParentsListPage;
