import Link from "next/link";

export default function Guide() {
    return (
        <div className="bg-image-top w-full h-full min-h-screen">
            <h1 className="p-3 text-2xl">ほめ力アップのTips！</h1>
            <div className="w-full flex justify-center"><img src="/images/niwatori.png" width="200"/></div>
            <div><table className="mx-auto mt-4 border-collapse border border-slate-500 bg-white">
            <tbody>
             <tr>
              <td className="border border-slate-600 p-4">取るに足らない、ささいなことでもほめる</td>
            </tr>
            </tbody>           
                </table>
            </div>
                <div className="w-full flex justify-end"><img src="/images/hiyoko.png" width="100" /></div>
            <div><table className="mx-auto mt-4 border-collapse border border-slate-500 bg-white">
            <tbody>
             <tr>
              <td className="border border-slate-600 p-4">あえて短所を長所に言い換えてほめる</td>
            </tr>
            </tbody>           
                </table>
            </div>
            <div><table className="mx-auto mt-4 border-collapse border border-slate-500 bg-white">
            <tbody>
             <tr>
              <td className="border border-slate-600 p-4">気づいたらすぐにほめる</td>
            </tr>
            </tbody>           
                </table>
            </div>
        
        </div>
    );
}