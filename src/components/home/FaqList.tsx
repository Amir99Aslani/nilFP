// Native <details name="faq"> gives an exclusive accordion with no client JS.
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <details key={item.q} name="faq" open={i === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
