export function InputBox({label, placeholder, onChange}) {
    return <div>
        <div className="font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="rounded w-full border border-slate-200 px-2 py-1" />
    </div>
}