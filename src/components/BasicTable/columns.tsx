import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  createColumnHelper,
  SortDirection,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { User } from "./types";

const columnHelper = createColumnHelper<User>();

const getSortIcon = (dir: SortDirection | false) => {
  if (dir === "asc") return <ArrowDown className="h-5 w-5" />;
  if (dir === "desc") return <ArrowUp className="h-5 w-5" />;
  return <ArrowUpDown className="h-4 w-4" />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<User, any>[] = [
  columnHelper.display({
    id: "actions",
    cell: () => <input type="checkbox" />,
  }),
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    sortingFn: "text",
    columns: [
      columnHelper.accessor("first_name", {
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.last_name, {
        id: "last_name",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();

      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()}>
          Email
          <div className="ml-2">{getSortIcon(sortDirection)}</div>
        </Button>
      );
    },
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
  }),
  columnHelper.accessor("phone_number", {
    header: "Phone Number",
  }),
  columnHelper.accessor("date", {
    header: "Birthday",
    cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
  }),
];
