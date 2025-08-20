export default function AE() {
  return (
    <div className="w-full">
      <table className="border border-gray-900 w-[90%] mx-auto text-5xl">
        <thead className="text-center">
          <tr>
            <th className="border border-gray-900">বামপক্ষ</th>
            <th className="border border-gray-900">ডানপক্ষ</th>
          </tr>
        </thead>
        <tbody>
          {/* a+b 2*/}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b)<sup>2</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>2</sup>+2ab+b<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              (a-b)<sup>2</sup>+4ab
            </td>
          </tr>
          {/* a-b 2*/}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              (a-b)<sup>2</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>2</sup>-2ab+b<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-4ab
            </td>
          </tr>

          {/* a2+b2 */}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>2</sup>+b<sup>2</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-2ab
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              (a-b)<sup>2</sup>+2ab
            </td>
          </tr>

          {/*2 a2+b2 */}
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              2(a<sup>2</sup>+b<sup>2</sup>)
            </td>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>+(a-b)<sup>2</sup>
            </td>
          </tr>

          {/*4 ab */}
          <tr>
            <td className="border border-gray-900 p-2 py-3">4ab</td>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-(a-b)<sup>2</sup>
            </td>
          </tr>

          {/* a2-b2 */}
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>2</sup>-b<sup>2</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">(a+b)(a-b)</td>
          </tr>

          {/* a+b+c */}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b+c)<sup>2</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>+2ab+2bc+2ca
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>+2(ab+bc+ca)
            </td>
          </tr>

          {/* a+b 3*/}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b)<sup>3</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>3</sup>+3a<sup>2</sup>b+3ab<sup>2</sup>+b<sup>3</sup>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>3</sup>+b<sup>3</sup>+3ab(a+b)
            </td>
          </tr>
          {/* a+b 3*/}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              (a-b)<sup>3</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>3</sup>-3a<sup>2</sup>b+3ab<sup>2</sup>-b<sup>3</sup>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              a<sup>3</sup>-b<sup>3</sup>-3ab(a-b)
            </td>
          </tr>

          {/* a3+b3 */}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>+b<sup>3</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)<sup>3</sup>-3ab(a+b)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              (a+b)(a<sup>2</sup>-ab+b<sup>2</sup>)
            </td>
          </tr>

          {/* a3-b3 */}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>-b<sup>3</sup>
            </td>
            <td className="border border-gray-900 p-2 py-3">
              (a-b)<sup>3</sup>+3ab(a-b)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              (a-b)(a<sup>2</sup>+ab+b<sup>2</sup>)
            </td>
          </tr>

          {/* a3+b3+c3 -3abc */}
          <tr>
            <td className="border border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>+b<sup>3</sup>+c<sup>3</sup>-3abc
            </td>
            <td className="border border-gray-900 p-2 py-3">
              (a+b+c)(a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>-ab-bc-ca)
            </td>
          </tr>
          <tr>
            <td className="border border-gray-900 p-2 py-3">
              1/2(a+b+c){`{`}(a-b)<sup>2</sup>+(b-c)<sup>2</sup>+(c-a)
              <sup>2</sup>
              {`}`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
// <sup>2</sup>
