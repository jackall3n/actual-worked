import { addDays, addHours, format, setHours, startOfDay, startOfWeek } from 'date-fns';

export default function Home() {
  const days = getRange(startOfWeek(new Date(), { weekStartsOn: 1 }), 7);

  const planned = [
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [5, 6],
    [1, 2],
    [1, 1],
    [3, 3],
    [3, 5],
    [2, 5],
    [7, 5],
    [8, 5],
    [8, 4],
  ]
  const actual = [
    [1, 4],
    [1, 2],
    [3, 3],
    [3, 5],
    [8, 5],
    [7, 5],
    [8, 4],
  ]

  const start = setHours(startOfDay(new Date()), 7);

  return (
    <div className="max-w-6xl p-5 container mx-5 grid bg-white rounded-lg mt-10 shadow md:mx-auto">
      <div className="grid grid-cols-8">
        <div className="flex flex-col text-center justify-center text-sm border-b border-dashed py-2" />
        {days.map(day => (
          <div key={day.toISOString()}
               className="flex flex-col text-center justify-center border-b border-dashed py-2">
            <div className="text-sm font-medium">
              {format(day, 'EE')}
            </div>
            <div className="text-sm">
              {format(day, 'do')}
            </div>
          </div>
        ))}

      </div>

      <div className="grid border-gray-500 rounded-md">
        {Array.from(Array(14)).map((_, y) => (
          <div key={y} className="grid grid-cols-8 border-b border-dashed">
            <div className="flex flex-col text-center justify-center text-sm py-2 border-r text-gray-500 font-medium">
              {format(addHours(start, y), 'HH:mm')}
            </div>

            <div className="col-span-7 grid grid-cols-7">
              {Array.from(Array(7)).map((_, x) => (
                <div key={x} className="flex text-center justify-center text-sm border-r h-12 p-0.5 cursor-pointer">
                  <div className="flex-1 flex rounded-lg overflow-hidden border box-content border-transparent hover:border-gray-200 bg-white hover:bg-gray-100 transition">
                    {planned.some(p => y === p[0] && x === p[1]) && <div className="bg-blue-400 flex-1 border border-opacity-10 border-black" />}
                    {actual.some(a => y === a[0] && x === a[1]) && <div className="bg-green-400 flex-1 border border-l-0 border-opacity-20 border-black" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center pt-5 text-sm">
        <div className="flex items-center justify-center ml-5">
          <div className="mr-2">Blocked Time: </div>
          <div className="bg-blue-400 w-5 h-5 rounded-md border border-opacity-10 border-black" />
        </div>
        <div className="flex items-center justify-center ml-5">
          <div className="mr-2">Actual Worked: </div>
          <div className="bg-green-400 w-5 h-5 rounded-md border border-opacity-10 border-black" />
        </div>
      </div>
    </div>
  )
}

function getRange(date: Date, days: number) {
  return Array.from(Array(days)).map((_, i) => addDays(date, i));
}
