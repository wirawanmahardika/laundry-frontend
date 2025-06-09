export default function Profil() {
    return <div className="container mx-auto max-w-4xl px-2 text-xs flex flex-col gap-y-3 items-center">
        <div className="flex flex-col gap-y-1 w-full items-center">
            <img className="rounded-full w-1/3" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" />
            <span className="text-xl font-bold">John Doe</span>
        </div>

        <div className="bg-white rounded-sm p-3 flex flex-col gap-y-1 w-full shadow-md text-sm">
            <div className="flex justify-between items-center p-1 mb-1">
                <h2 className="text-base font-semibold">Account Details</h2>
                <button className="btn btn-accent btn-xs">Edit Profile</button>
            </div>
            <hr />
            <div className="flex flex-col gap-y-1 mt-2 text-stone-800 font-medium">
                <div className="flex justify-between items-center">
                    <span className="text-stone-600">Fullname</span>
                    <span>Wirawan Mahardika</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-1 mt-2 text-stone-800 font-medium">
                <div className="flex justify-between items-center">
                    <span className="text-stone-600">Email</span>
                    <span>john@gmail.com</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-1 mt-2 text-stone-800 font-medium">
                <div className="flex justify-between items-center">
                    <span className="text-stone-600">Pendapatan</span>
                    <span>Rp {(20000000).toLocaleString("id")}</span>
                </div>
            </div>
            <div className="flex flex-col gap-y-1 mt-2 text-stone-800 font-medium">
                <div className="flex justify-between items-center">
                    <span className="text-stone-600">Phone</span>
                    <span>081234567890</span>
                </div>
            </div>
        </div>
    </div>
}