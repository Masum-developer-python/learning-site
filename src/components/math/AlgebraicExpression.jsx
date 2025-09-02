export default function AE({ selectedColor }) {
  return (
    <div
      className={`mx-auto print:text-xl ${selectedColor.textColor} ${selectedColor.backgroundColor} print:text-black
      print:bg-transparent print:bg-opacity-0
      `}
    >
      <tcaption className="text-center print:flex print:justify-center text-3xl md:text-5xl mb-4 mt-2">
        বীজগাণিতিক রাশির সূত্রাবলী
      </tcaption>
      <table
        className="border border-collapse w-full border-gray-900 
        mx-auto md:text-5xl overflow-x-auto break-after-page
      "
      >
        <thead className="text-center">
          <tr className="break-inside-avoid">
            <th className="border border-gray-900">বামপক্ষ</th>
            <th className="border border-gray-900">ডানপক্ষ</th>
          </tr>
        </thead>
        <tbody>
          {/* a+b 2*/}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b)<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>+2ab+b<sup>2</sup>
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a-b)<sup>2</sup>+4ab
            </td>
          </tr>
          {/* a-b 2*/}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              (a-b)<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>-2ab+b<sup>2</sup>
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-4ab
            </td>
          </tr>

          {/* a2+b2 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>2</sup>+b<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-2ab
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a-b)<sup>2</sup>+2ab
            </td>
          </tr>

          {/*2 a2+b2 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              2(a<sup>2</sup>+b<sup>2</sup>)
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>+(a-b)<sup>2</sup>
            </td>
          </tr>

          {/*4 ab */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">4ab</td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-(a-b)<sup>2</sup>
            </td>
          </tr>

          {/* a2-b2 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>-b<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">(a+b)(a-b)</td>
          </tr>

          {/* a+b+c */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b+c)<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>+2ab+2bc+2ca
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>+2(ab+bc+ca)
            </td>
          </tr>

          {/* a+b 3*/}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              (a+b)<sup>3</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>3</sup>+3a<sup>2</sup>b+3ab<sup>2</sup>+b<sup>3</sup>
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>3</sup>+b<sup>3</sup>+3ab(a+b)
            </td>
          </tr>
          {/* a+b 3*/}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              (a-b)<sup>3</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>3</sup>-3a<sup>2</sup>b+3ab<sup>2</sup>-b<sup>3</sup>
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>3</sup>-b<sup>3</sup>-3ab(a-b)
            </td>
          </tr>

          {/* a3+b3 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>+b<sup>3</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>3</sup>-3ab(a+b)
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)(a<sup>2</sup>-ab+b<sup>2</sup>)
            </td>
          </tr>

          {/* a3-b3 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>-b<sup>3</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a-b)<sup>3</sup>+3ab(a-b)
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a-b)(a<sup>2</sup>+ab+b<sup>2</sup>)
            </td>
          </tr>

          {/* a3+b3+c3 -3abc */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3" rowSpan={2}>
              a<sup>3</sup>+b<sup>3</sup>+c<sup>3</sup><br/>-3abc
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b+c)(a<sup>2</sup>+b<sup>2</sup>+c<sup>2</sup>-ab-bc-ca)
            </td>
          </tr>
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              1/2(a+b+c){`{`}(a-b)<sup>2</sup>+(b-c)<sup>2</sup>+(c-a)
              <sup>2</sup>
              {`}`}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className={`h-16 ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
      >
        <pre
          className={`overflow-x-auto whitespace-pre-wrap break-words p-4 md:text-2xl ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
        >
          {`
=================================================================
     সমস্যা সমাধান এর বিস্তারিত ব্যাখ্যা
=================================================================

প্রশ্ন: a - b = 4 এবং ab = 60 হলে, a + b এর মান কত?

-----------------------------------------------------------------
ধাপ ১: কী কী তথ্য দেওয়া আছে?
-----------------------------------------------------------------
✓ দেওয়া আছে: a - b = 4
✓ দেওয়া আছে: ab = 60  
? খুঁজতে হবে: a + b = ?

-----------------------------------------------------------------
ধাপ ২: কোন সূত্র ব্যবহার করব?
-----------------------------------------------------------------

পদ্ধতি ১: (a + b)² = a² + 2ab + b² ❌

    এই সূত্র ব্যবহার করতে লাগবে:
    • a + b (অজ্ঞাত - যেটা বের করতে চাই)
    • a² + b² (জানা নেই)  
    • ab = 60 (জানা আছে)

    সমস্যা:
    → আমরা a² + b² জানি না
    → তাই এই সূত্র ব্যবহার করা যাবে না

পদ্ধতি ২: (a + b)² = (a - b)² + 4ab ✅

    এই সূত্র ব্যবহার করতে লাগবে:
    • a - b = 4 (জানা আছে ✅)
    • ab = 60 (জানা আছে ✅)
    • a + b (যেটা বের করতে হবে)

    সুবিধা: সব তথ্য জানা আছে!

-----------------------------------------------------------------
ধাপ ৩: সূত্রটি কোথা থেকে এলো?
-----------------------------------------------------------------

গাণিতিক প্রমাণ:
    (a + b)² = a² + 2ab + b²  ... (১)
    (a - b)² = a² - 2ab + b²  ... (২)

    (১) - (২) করলে:
    (a + b)² - (a - b)² = 4ab
    
    ∴ (a + b)² = (a - b)² + 4ab

-----------------------------------------------------------------
ধাপ ৪: সমাধান প্রক্রিয়া
-----------------------------------------------------------------

দেওয়া: a - b = 4, ab = 60

সূত্র প্রয়োগ: (a + b)² = (a - b)² + 4ab

মান বসানো:
    (a + b)² = (4)² + 4(60)
    (a + b)² = 16 + 240  
    (a + b)² = 256

বর্গমূল নেওয়া:
    a + b = ±√256 = ±16

-----------------------------------------------------------------
ধাপ ৫: কেন দুটি উত্তর (+16 এবং -16)?
-----------------------------------------------------------------

গাণিতিক কারণ:
    √256 = +16 অথবা -16
    কারণ: (+16)² = 256 এবং (-16)² = 256

যাচাই:
    ক্ষেত্রে ১: a = 10, b = 6
    • a - b = 10 - 6 = 4 ✅
    • ab = 10 × 6 = 60 ✅  
    • a + b = 10 + 6 = 16 ✅

=================================================================
মূল শিক্ষা
=================================================================

🎯 সূত্র নির্বাচনের নীতি:
   1. দেওয়া তথ্য চিহ্নিত করুন
   2. কোন সূত্রে সেই তথ্যগুলো আছে খুঁজুন  
   3. যে সূত্রে সব জানা রাশি আছে, সেটাই ব্যবহার করুন

📝 মনে রাখার কৌশল:
   • a - b এবং ab দেওয়া → (a + b)² = (a - b)² + 4ab
   • a + b এবং ab দেওয়া → (a - b)² = (a + b)² - 4ab  
   • a + b এবং a - b দেওয়া → ab = [(a+b)² - (a-b)²]/4

=================================================================
অনুশীলনী প্রশ্ন
=================================================================

1. a + b = 8 এবং ab = 15 হলে, a - b = ?
2. a - b = 6 এবং ab = 27 হলে, a + b = ?  
3. a + b = 12 এবং a - b = 4 হলে, ab = ?
`}
        </pre>
      </div>
    </div>
  );
}
// <sup>2</sup>
