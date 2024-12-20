import { Input } from "./ui/input";

type Props = {
  setSearch: any;
};
export default function SearchBox({ setSearch }: Props) {
  return (
    <>
      <div>
        <Input
          placeholder="Search..."
          type={"text"}
          onChange={(event: any) => {
            setSearch(event.target.value);
          }}
          className="max-w-sm justify-end"
        />
      </div>
    </>
  );
}
