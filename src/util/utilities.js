const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * @function getDate
 * @description Returns the date in a human-readable format
 * @param {Date} date
 * @returns {JSX.Element}
 */
export const getDate = (date) => {
    return <p
        className={'text-center text-slate-500 mt-3'}>{days[new Date(date).getDay()]}, {String(new Date(date).getDate()).padStart(2, '0')}-{String(new Date(date).getMonth() + 1).padStart(2, '0')}-{new Date(date).getFullYear()}</p>
};
