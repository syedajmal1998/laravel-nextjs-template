import React from 'react'

export default function Alert({ type = 'info', message = null, show = false }) {
    if (show && message) {

        switch (type) {
            case 'info':
                return <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    {message}
                </div>
            case 'error':
                return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {message}
                </div>
            case 'success':
                return <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    {message}
                </div>
            case 'warning':
                return <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    {message}
                </div>
            case 'dark':
                return <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    {message}
                </div>
        }
    }

    return (
        <></>
    )
}
