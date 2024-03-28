export default function List({
  items,
}: {
  items: { id: number; name: string }[];
}) {
  const listItems = items.map((item) => (
    <li className="py-2 text-foreground" key={item.id}>
      {item.name}
    </li>
  ));

  return <ul className="mb-16 list-inside lg:mb-0">{listItems}</ul>;
}
