import FormModal from "@/src/components/FormModal";
import Pagination from "@/src/components/Pagination";
import Table from "@/src/components/Table";
import TableSearch from "@/src/components/TableSearch";
import { Prisma } from "@/src/generated/prisma";
import { role } from "@/src/lib/data";
import { prisma } from "@/src/lib/prisma";
import { ITEM_PER_PAGE } from "@/src/lib/utils";
import Image from "next/image";

type ResultsList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
    // className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ResultsList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#f2f1ff]"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.title}</h3>
      </div>
    </td>
    <td className="">{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">
      {item.teacherName + " " + item.teacherSurname}
    </td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-AU").format(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table={"result"} type={"update"} data={item} />
            <FormModal table={"result"} type={"delete"} id={item.id} />
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

  const query: Prisma.ResultWhereInput = {};

  // URL PARAMS RULES

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            query.OR = [
              {
                exam: {
                  title: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
              },
              {
                student: {
                  name: {
                    contains: value,
                    mode: "insensitive",
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

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: { name: true, surname: true },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.result.count({ where: query }),
  ]);

  const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold hidden md:block ">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="flex justify-center items-center gap-4 w-8 h-8 bg-yellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table={"result"} type={"create"} />}
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

export default ExamsListPage;
