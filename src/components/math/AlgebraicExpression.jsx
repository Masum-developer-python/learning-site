import React from "react";
import MathJax from "react-mathjax2";

export default function AE({ selectedColor }) {
  // প্রতিটি প্রশ্নের জন্য LaTeX অংশ আলাদা করে রাখতে পারি (optional)
  const questionsLatex = [
    "a - b = 4, \\ ab = 60\\Rightarrow a + b = ?",
    "a + b = 9m, \\ ab = 18m^2\\Rightarrow a - b = ?",
    "x - \\frac{1}{x} = 4 \\Rightarrow x^4 + \\frac{1}{x^4} = 322",
    "2x + \\frac{2}{x} = 3 \\Rightarrow x^2 + \\frac{1}{x^2} = ?",
    "a + \\frac{1}{a} = 2 \\Rightarrow a^2 + \\frac{1}{a^2} = a^4 + \\frac{1}{a^4}",
    "a + b = \\sqrt{7}, a - b = \\sqrt{5} \\Rightarrow 8ab(a^2 + b^2) = 24",
    "a + b + c = 9,  ab + bc + ca = 31 \\Rightarrow a^2 + b^2 + c^2 = ?",
    "a^2 + b^2 + c^2 = 9, \\ ab + bc + ca = 8 \\Rightarrow (a+b+c)^2 = ?",
    "a + b + c = 6, \\  (a^2+b^2+c^2)  = 14 \\Rightarrow (a-b)^2 + (b-c)^2 + (c-a)^2 = ?",
    "x=3, y=4, z=5 \\Rightarrow 9x^2 + 16y^2 + 4z^2 - 24xy - 16yz + 12zx = ?",
  ];

  const answerLatex = [
    [
      "given\\ that ,",
      "a - b = 4, \\ ab = 60",
      "we\\ know\\ that,",
      "(a + b)^2 = (a - b)^2 + 4ab",
      "\\Rightarrow (a + b)^2 = (4)^2 + 4(60)",
      "\\Rightarrow (a + b)^2 = 16 + 240",
      "\\Rightarrow (a + b)^2 = 256",
      "\\Rightarrow a + b   = \\sqrt{256} ",
      "\\therefore  a + b   = 16",
    ],
    [
      "given\\ that ,",
      "a + b = 9m, \\ ab = 18m^2",
      "we\\ know\\ that,",
      "(a - b)^2 = (a+b)^2 - 4ab",
      "\\Rightarrow (a - b)^2 = (9m)^2 - 4(18m^2)",
      "\\Rightarrow (a - b)^2 = 81m^2 - 72m^2",
      "\\Rightarrow (a - b)^2 = 9m^2",
      "\\Rightarrow a - b   = 3m",
      "\\therefore  a - b   = 3m",
    ],
    [
      "given\\ that,",
      "x - \\frac{1}{x} = 4",
      "\\Rightarrow (x - \\frac{1}{x})^2 = 4^2",
      "\\Rightarrow x^2 - 2x\\frac{1}{x} + \\frac{1}{x^2} = 16",
      "\\Rightarrow x^2 + \\frac{1}{x^2} = 16 + 2",
      "\\Rightarrow x^2 + \\frac{1}{x^2} = 18",
      "\\Rightarrow (x^2 + \\frac{1}{x^2})^2 = 18^2",
      "\\Rightarrow (x^2)^2 + 2x^2\\frac{1}{x^2} + (\\frac{1}{x^2})^2 = 324",
      "\\Rightarrow x^4 + 2 + \\frac{1}{x^4} = 324",
      "\\Rightarrow x^4 + \\frac{1}{x^4} = 324 - 2",
      "\\therefore x^4 + \\frac{1}{x^4} = 322",
    ],
    [
      "given\\ that,",
      "2x + \\frac{2}{x} = 3",
      "\\Rightarrow 2\\left(x + \\frac{1}{x}\\right) = 3",
      "\\Rightarrow x + \\frac{1}{x} = \\frac{3}{2}",
      "\\Rightarrow \\left(x + \\frac{1}{x}\\right)^2 = \\left(\\frac{3}{2}\\right)^2",
      "\\Rightarrow x^2 + 2 + \\frac{1}{x^2} = \\frac{9}{4}",
      "\\Rightarrow x^2 + \\frac{1}{x^2} = \\frac{9}{4} - 2",
      "\\Rightarrow x^2 + \\frac{1}{x^2} = \\frac{9 - 8}{4}",
      "\\therefore x^2 + \\frac{1}{x^2} = \\frac{1}{4}",
    ],
    [
      "given\\ that,",
      "a + \\frac{1}{a} = 2",

      "\\text{L.H.S.} = a^2 + \\frac{1}{a^2}",
      "= \\left(a + \\frac{1}{a}\\right)^2 - 2",
      "= (2)^2 - 2",
      "= 4 - 2",
      "= 2",

      "\\text{R.H.S.} = a^4 + \\frac{1}{a^4}",
      "= (a^2)^2 + \\left(\\tfrac{1}{a^2}\\right)^2",
      "= (a^2 + \\tfrac{1}{a^2})^2 - 2a^2\\cdot\\tfrac{1}{a^2}",
      "= (a^2 + \\tfrac{1}{a^2})^2 - 2",
      "= \\{(a + \\tfrac{1}{a})^2 - 2\\}^2 - 2",
      "= (2^2 - 2)^2 - 2",
      "= (4 - 2)^2 - 2",
      "= 2^2 - 2",
      "= 4 - 2",
      "= 2",
      "\\therefore \\text{L.H.S.} = \\text{R.H.S.}",
    ],
    [
      "given\\ that ,",
      "a + b = \\sqrt{7}, a - b = \\sqrt{5} ",
      "\\text{L.H.S.} = 8ab(a^2+b^2)",
      "= 4ab \\times 2(a^2+b^2)",
      "= \\{(a+b)^2 - (a-b)^2\\}\\{(a+b)^2 + (a-b)^2\\}",
      "= \\{(\\sqrt{7})^2 - (\\sqrt{5})^2 \\} \\; \\times \\; \\{(\\sqrt{7})^2 + (\\sqrt{5})^2\\}",
      "= (7 - 5)(7 + 5)",
      "= 2 \\times 12",
      "= 24",
      "\\therefore \\text{L.H.S.} = \\text{R.H.S.}",
    ],

    ["given\\\\ that ,", "a + b + c = 9,  ab + bc + ca = 31 "],
    ["given\\ that ,", "a^2 + b^2 + c^2 = 9, \\ ab + bc + ca = 8 "],
    ["given\\ that ,", "a + b + c = 6, \\  (a^2+b^2+c^2)  = 14 "],
    ["given\\ that ,", "x=3, y=4, z=5 "],
  ];

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
        mx-auto md:text-5xl overflow-x-auto
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              4ab
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)<sup>2</sup>-(a-b)<sup>2</sup>
            </td>
          </tr>

          {/* a2-b2 */}
          <tr className="break-inside-avoid">
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              a<sup>2</sup>-b<sup>2</sup>
            </td>
            <td className="border overflow-x-auto border-gray-900 p-2 py-3">
              (a+b)(a-b)
            </td>
          </tr>

          {/* a+b+c */}
          <tr className="break-inside-avoid">
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
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
            <td
              className="border overflow-x-auto border-gray-900 p-2 py-3"
              rowSpan={2}
            >
              a<sup>3</sup>+b<sup>3</sup>+c<sup>3</sup>
              <br />
              -3abc
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

      <div className={` ${selectedColor.textColor}`}>
        <pre
          className={`overflow-x-hidden text-left break-words p-4 print:p-0 md:text-2xl ${selectedColor.textColor}`}
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
    ধাপ ৩: সমাধান প্রক্রিয়া
-----------------------------------------------------------------

দেওয়া আছে ,
    a - b = 4
 এবং ab = 60
  জানি, 
    (a + b)² = (a - b)² + 4ab
  =>(a + b)² = (4)² + 4(60)
  =>(a + b)² = 16 + 240  
  =>(a + b)² = 256
  => a + b   = √256 
  ∴ a + b   = 16

=================================================================
    মূল শিক্ষা
=================================================================

🎯 সূত্র নির্বাচনের নীতি:
   1. দেওয়া তথ্য চিহ্নিত করুন
   2. কোন সূত্রে সেই তথ্যগুলো আছে খুঁজুন  
   3. যে সূত্রে সব জানা রাশি আছে, সেটাই ব্যবহার করুন
`}
        </pre>
      </div>

      <div className="relative max-w-4xl mx-auto p-6  shadow-lg rounded-xl z-0">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          কিছু প্রশ্ন
        </h1>
        <MathJax.Context input="tex">
          <ol className="space-y-4 text-2xl lg:text-4xl">
            {questionsLatex.map((q, i) => (
              <li
                key={i}
                className="bg-blue-100/35 p-3 rounded-lg shadow-sm hover:bg-blue-300/35 
                print:bg-blue-100/10 transition"
              >
                <MathJax.Node>{q}</MathJax.Node>

                <div className="mt-2 text-lg lg:text-xl">
                  <details>
                    <summary className="cursor-pointer underline decoration-dotted">
                      উত্তর দেখুন
                    </summary>
                    <div className="mt-2 text-left">
                      {answerLatex[i].map((step, j) => (
                        <MathJax.Node key={j}>{step}</MathJax.Node>
                      ))}
                    </div>
                  </details>
                </div>
              </li>
            ))}
          </ol>
        </MathJax.Context>
      </div>
    </div>
  );
}
// <sup>2</sup>
