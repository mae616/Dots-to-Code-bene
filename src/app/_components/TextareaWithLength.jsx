import { InputTextarea } from 'primereact/inputtextarea';

export default function TextareaWithLength({}) {
  return (
    <div>
     <InputTextarea rows={5} className="text-sm resize-none w-full" />
     <div className="text-xs text-right text-slate-500">0/100</div>
  </div>
  );
};
