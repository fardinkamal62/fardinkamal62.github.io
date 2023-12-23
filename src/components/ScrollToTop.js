'use client';

import { ArrowUpward } from "@mui/icons-material";

export default function ScrollToTop() {

    const handleScroll = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div>
            <button
                onClick={handleScroll}
                className={'fixed bottom-5 right-5 bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                <ArrowUpward/>
            </button>
        </div>
    )
}