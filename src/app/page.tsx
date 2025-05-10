export default function page() {
  return (
    <main>
      {/* 其他内容 */}
      <div className="bg-secondary-200 text-secondary-800">234234</div>
      <div className="bg-accent-500 text-white">2342342342</div>

      <div className="bg-lightMode-bg-primary dark:bg-darkMode-bg-primary">23423423</div>
      <p className="text-lightMode-text-primary dark:text-darkMode-text-primary">234234234</p>

      <article className="prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic bread with cheese to
          their children, with the food earning such an iconic status in our culture that kids will
          often dress up as warm, cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked to a series of rabies
          cases springing up around the country.
        </p>
      </article>
    </main>
  )
}
