import FormModal from "@/src/components/FormModal";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import TableSearch from "@/src/components/TableSearch";
import { Prisma, Exam, Subject, Teacher, Class } from "@/src/generated/prisma";
import { role } from "@/src/lib/data";
import { prisma } from "@/src/lib/prisma";
import { ITEM_PER_PAGE } from "@/src/lib/utils";
import Image from "next/image";

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Date",
    accessor: "dueDate",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

type ExamList = Exam & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#f2f1ff]"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.lesson.subject.name}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">{item.lesson.class.name}</td>

    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-AU").format(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table={"exam"} type={"update"} data={item} />
            <FormModal table={"exam"} type={"delete"} id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamsListPage = async ({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {};

  // URL PARAMS RULES

  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.exam.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold hidden md:block ">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table={"exam"} type={"create"} />}
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

export default ExamsListPage;
