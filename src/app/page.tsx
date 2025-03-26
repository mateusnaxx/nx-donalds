import Link from 'next/link'

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-4xl font-bold">Bem-vindo!</h1>

            <div className="flex justify-center">
                <Link
                    href={`/nx-donalds`}
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:bg-blue-700"
                >
                    NX Donalds
                </Link>
            </div>
            <footer className=" fixed bottom-3 mt-10 text-gray-600 text-sm">
                © {new Date().getFullYear()} Powered by NAXX
            </footer>
        </div>
    )
}

export default HomePage
