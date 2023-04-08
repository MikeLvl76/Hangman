export const Leaderboard = ({ rows }) => {
  const renderBody = () =>
    rows
      .sort((a, b) => b.total - a.total)
      .map((v, i) => (
        <tr className="grid grid-gap-8 grid-cols-8" key={i}>
          <td className="rounded-lg px-2">{v.player}</td>
          <td className="rounded-lg px-2">{v.date}</td>
          <td className="rounded-lg px-2">{v.word}</td>
          <td className="rounded-lg px-2">{v.try_count}</td>
          <td className="rounded-lg px-2">{v.correct}</td>
          <td className="rounded-lg px-2">{v.wrong}</td>
          <td className="rounded-lg px-2">{v.is_found}</td>
          <td className="rounded-lg px-2">{v.total}</td>
        </tr>
      ));

  return (
    <div className="flex justify-center absolute inset-x-0 bottom-0 mx-auto w-fit h-64 mt-10 rounded-lg bg-white overflow-y-auto scrollbar-hide mb-5">
      <table className="table-auto border-collapse text-center border-spacing-2 items-center">
        <thead className="bg-purple-500 block text-white sticky top-0">
          <tr className="grid grid-gap-8 grid-cols-8">
            <th className="rounded-lg px-2 py-2">Player</th>
            <th className="rounded-lg px-2 py-2">Date</th>
            <th className="rounded-lg px-2 py-2">Word</th>
            <th className="rounded-lg px-2 py-2">Tries</th>
            <th className="rounded-lg px-2 py-2">Correct letters</th>
            <th className="rounded-lg px-2 py-2">Wrong letters</th>
            <th className="rounded-lg px-2 py-2">Found?</th>
            <th className="rounded-lg px-2 py-2">Total score</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200 uppercase block overflow-x-hidden min-h-min max-h-max">
          {renderBody()}
        </tbody>
      </table>
    </div>
  );
};
