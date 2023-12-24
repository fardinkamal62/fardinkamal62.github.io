'use client'

export default function Search({pageName, handleChange}) {
    return (
        <div className='flex flex-col items-center justify-center my-2'>
            <input
                type="text"
                placeholder={`Search ${pageName}`}
                className="bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md dark:border-slate-800 dark:border shadow"
                onChange={handleChange}
            />
        </div>
    )
}