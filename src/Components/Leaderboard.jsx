export const Leaderboard = (props) => (
  <div className="flex justify-center absolute inset-x-0 bottom-0 mx-auto w-fit h-64 mt-10 rounded-lg bg-white overflow-y-auto scrollbar-hide mb-5">
    <table className="table-auto border-collapse text-center border-spacing-2 items-center">
      <thead className="bg-purple-500 block text-white sticky top-0">
        <tr className="grid grid-gap-8 grid-cols-8">
          <th className="rounded-lg px-2 py-2">Player</th>
          <th className="rounded-lg px-2 py-2">Date</th>
          <th className="rounded-lg px-2 py-2">Word</th>
          <th className="rounded-lg px-2 py-2">Attempts count</th>
          <th className="rounded-lg px-2 py-2">Correct letters</th>
          <th className="rounded-lg px-2 py-2">Wrong letters</th>
          <th className="rounded-lg px-2 py-2">Found?</th>
          <th className="rounded-lg px-2 py-2">Score</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 uppercase block overflow-x-hidden min-h-min max-h-max">
        {props.rows.map((json, index) => {
          const keys = Object.keys(json).filter(
            (name) => !["__v", "_id"].includes(name)
          );
          const values = keys.map((key) => json[key]);
          return (
            <tr className="grid grid-gap-8 grid-cols-8" key={index}>
              {values.map((value) => (
                <td className="rounded-lg px-2" title={value}>
                  {value}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
