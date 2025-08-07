console.log("data.js");

export const fileLocation = "/";

export let rootAddress = localStorage.getItem("rootAddress");
if (
  localStorage.getItem("rootAddress") === null ||
  localStorage.getItem("rootAddress") === ""
) {
  rootAddress = "https://rare-academy.xyz/api/lq/";
  localStorage.setItem("rootAddress", rootAddress);
} else if (
  localStorage.getItem("rootAddress") !== "https://rare-academy.xyz/api/lq/"
) {
  localStorage.setItem("rootAddress", "https://rare-academy.xyz/api/lq/");
}
console.log("rootAddress", rootAddress);
export const siteTitle =
  "Al  Quran  learning , developed by RARE academy with Masum";

export const alphabetColorCombinations = [
  {
    theme: "Calm Learning",
    combinations: [
      {
        backgroundColor: "bg-blue-50",
        textColor: "text-blue-800",
        description: "Soft blue & deep blue",
      },
      {
        backgroundColor: "bg-orange-50",
        textColor: "text-orange-900",
        description: "Soft orange & deep orange",
      },
      {
        backgroundColor: "bg-yellow-100",
        textColor: "text-gray-900",
        description: "Light yellow & dark gray",
      },
      {
        backgroundColor: "bg-teal-50",
        textColor: "text-teal-900",
        description: "Mild teal & dark teal",
      },
    ],
  },
  {
    theme: "High Contrast",
    combinations: [
      {
        backgroundColor: "bg-white",
        textColor: "text-black",
        description: "Classic black & white",
      },
      {
        backgroundColor: "bg-gray-100",
        textColor: "text-indigo-800",
        description: "Light gray & deep indigo",
      },
      {
        backgroundColor: "bg-yellow-50",
        textColor: "text-purple-900",
        description: "Soft yellow & deep purple",
      },
    ],
  },
  {
    theme: "Pastel Soft",
    combinations: [
      {
        backgroundColor: "bg-pink-50",
        textColor: "text-pink-900",
        description: "Soft pink & deep pink",
      },
      {
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-900",
        description: "Light blue & deep blue",
      },
      {
        backgroundColor: "bg-green-50",
        textColor: "text-green-900",
        description: "Pale green & dark green",
      },
    ],
  },
  {
    theme: "Night Study",
    combinations: [
      {
        backgroundColor: "bg-gray-900",
        textColor: "text-yellow-100",
        description: "Dark gray & pale yellow",
      },
      {
        backgroundColor: "bg-black",
        textColor: "text-green-200",
        description: "Black & soft green",
      },
      {
        backgroundColor: "bg-gray-800",
        textColor: "text-purple-200",
        description: "Charcoal & light purple",
      },
    ],
  },
];
// console.log(alphabetColorCombinations[0].combinations[0].backgroundColor);
// let cl = alphabetColorCombinations[0].combinations[1];
// console.log(cl);

export const arabicDiacritics = {
  Letter: {
    title: "বর্ণমালা",
    diacritics: [],
  },
  Harakat: {
    title: "হারাকাত",
    meaning: "নড়াচড়া করা",
    video : "/videos/harakat.mp4",
    diacritics: [
      {
        name: "Fathah",
        title: "যবর",
        description: "দুই চোয়াল আলাদা করে মুখ খোলা রেখে যবর উচ্চারণ করতে হয়। বাংলা আ-কার এর মতো । যেমন :বা بَ",
        symbol: "\u064E", // ـَ
        unicode: "U+064E",
        indication: [], //"Short 'a' sound",
        pages: [
          {
            name: "Words",
            title: "যবরযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn: ["end", "middle", "start"],
          },
        ],
      },
      {
        name: "Kasrah",
        title: "যের",
        description: "নিচের চোয়াল ঝুঁকিয়ে যের উচ্চারণ করতে হয়।  বাংলা ই-কার এর মতো । যেমন :বি بِ",
        symbol: "\u0650", // ـِ
        unicode: "U+0650",
        indication: [], //"Short 'i' sound",
        pages: [
          {
            name: "Words",
            title: "যেরযুক্ত শব্দ",
            column: ["", "", "উদাহরন"],
            columnEn: ["", "", "start"],
          },
        ],
      },
      {
        name: "Dhammah",
        title: "পেশ",
        description: "দুই ঠোট সম্পূর্ণভাবে গোল করে বাধাহীনভাবে পেশ উচ্চারণ করতে হয়।  বাংলা উ-কার এর মতো । যেমন :বু بُ",
        symbol: "\u064F", // ـُ
        unicode: "U+064F",
        indication: [], //"Short 'u' sound",
        pages: [
          {
            name: "Words",
            title: "পেশযুক্ত শব্দ",
            column: ["", "", "উদাহরন"],
            columnEn: ["", "", "start"],
          },
        ],
      },
    ],
  },

  sakinah: {
    title: "সাকিনাহ্",
    meaning: "নীরব",
    video : "/videos/sakinah.mp4",
    diacritics: [
      {
        name: "Saakinah",
        title: "সাকিনাহ্",
        description: "স্থীরভাবে নড়াচড়াহীন অবস্থায় সাকিনাহ্ উচ্চারণ করতে হয়। বাংলা হসন্তের মতো । যেমন : ব্ بْ ",
        symbol: "\u0652", // ـْ
        unicode: "U+0652",
        indication: [], //"No vowel (silent letter)",
        pages: [
          {
            name: "Words",
            title: "সাকিনযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", ""],
            columnEn: ["end", "middle", ""],
          },
        ],
      },
    ],
  },
  Madd: {
    title: "মাদ্দ",
    meaning: "প্রসারিত করা বা লম্বা করা",
    video : "/videos/madd.mp4",
    diacritics: [
      {
        name: "AlifMadd",
        title: "আলিফ মাদ্দ / খাড়া যবর",
        description:
          "দুই চোয়াল আলাদা করে মুখ খোলা রেখে দীর্ঘ করে খাড়া যবর উচ্চারণ করতে হয়। বাংলা দীর্ঘ আ-কার এর মতো । যেমন :বাা بَا",
        symbol: "\u0657", // ـٰ
        unicode: "U+0670",
        indication: ["U+064E", "U+0627", "U+200B"], //"Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "আলিফ মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn: ["end", "middle", "start"],
          },
        ],
      },
      {
        name: "YaaMadd",
        title: "ইয়া মাদ্দ / খাড়া যের",
        description:
          "নিচের চোয়াল ঝুঁকিয়ে দীর্ঘ করে খাড়া যের উচ্চারণ করতে হয়।  বাংলা দীর্ঘ ই-কার এর মতো । যেমন : বী بٖ",
        symbol: "\u0656", // ـٰ
        unicode: "U+0656",
        indication: ["U+0650", "U+064A", "U+0652"], //"Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "ইয়া মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn: ["end", "middle", "start"],
          },
        ],
      },
      {
        name: "WaaoMadd",
        title: "ওয়াও মাদ্দ / উল্টা পেশ",
        description:
          "দুই ঠোট সম্পূর্ণভাবে গোল করে বাধাহীনভাবে দীর্ঘ স্বরে উল্টা পেশ উচ্চারণ করতে হয়।  বাংলা ঊ-কার এর মতো । যেমন :বূ بُ",
        symbol: "\u0657", // ـٰ
        unicode: "U+0657",
        indication: ["U+064F", "U+0648", "U+0652"], //"Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "ওয়াও মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn: ["end", "middle", "start"],
          },
        ],
      },
    ],
  },

  Tanween: {
    title: "তানভীন",
    meaning: "দুই যবর, দুই যের, দুই পেশ",
    video : "/videos/tanween.mp4",
    diacritics: [
      {
        name: "FathahTanween",
        title: "দুই যবর",
        description: "দুই চোয়াল আলাদা করে মুখ খোলা রেখে যবর এবং নুন সাকিন সহ দুই যবর উচ্চারণ করতে হয়। বাংলা আ-কার+ন্ এর মতো । যেমন :বান্ بَ",
        symbol: "\u064B", // ـً
        unicode: "U+064B",
        indication: ["U+064E", "U+0646", "U+0652"], // Represents 'an' sound (tanween)
        // "Indicates 'an' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই যবরযুক্ত শব্দ",
            column: ["", "", "দুই যবর"],
            columnEn: ["", "", "start"],
          },
        ],
      },
      {
        name: "KasrahTanween",
        title: "দুই যের",
        description: "নিচের চোয়াল ঝুঁকিয়ে যের এবং নুন সাকিন সহ দুই যের উচ্চারণ করতে হয়।  বাংলা ই-কার+ন্ এর মতো । যেমন :বিন্ بِ",
        symbol: "\u064D", // ـٍ
        unicode: "U+064D",
        indication: ["U+0650", "U+0646", "U+0652"], // Represents 'in' sound (tanween)
        // "Indicates 'in' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই যেরযুক্ত শব্দ",
            column: ["", "দুই যের", ""],
            columnEn: ["", "middle", ""],
          },
        ],
      },
      {
        name: "DhammahTanween",
        title: "দুই পেশ",
        description: "দুই ঠোট সম্পূর্ণভাবে গোল করে বাধাহীনভাবে পেশ এবং নুন সাকিন সহ দুই পেশ উচ্চারণ করতে হয়।  বাংলা উ-কার+ন্ এর মতো । যেমন :বুন্ بُ",
        symbol: "\u064C", // ـٌ
        unicode: "U+064C",
        indication: ["U+064F", "U+0646", "U+0652"], // Represents 'un' sound (tanween)
        // "Indicates 'un' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই পেশযুক্ত শব্দ",
            column: ["দুই পেশ", "", ""],
            columnEn: ["end", "", ""],
          },
        ],
      },
    ],
  },

  shaddah: {
    title: "তাশদীদ",
    meaning: "দ্বিত্ববর্ণ",
    video : "/videos/tashdeed.mp4",
    diacritics: [
      {
        name: "AshShaddah",
        title: "তাশদীদ ",
        description: "তাশদীদ উচ্চারণের সময় বর্ণ দ্বিত্ব হয় অর্থ্যাৎ প্রথম বার সাকিন এবং দ্বিতীয় বার হরকত / মাদ্দ / তানভীন অনুসারে উচ্চারিত হয়। যেমন :ব্ব بّ",
        symbol: "\u0651", // ـّ
        unicode: "U+0651",
        indication: ["U+0652"], //"Indicates doubling (gemination)",
        pages: [
          {
            name: "Words_harakat",
            title: "তাশদীদ এবং হারকাত যুক্ত শব্দ",
            column: ["দ্বাম্মাহ এর সাথে", "কাসরাহ এর সাথে", "ফাতহাহ এর সাথে"],
            columnEn: ["end", "middle", "start"],
          },
          {
            name: "Words_tanween",
            title: "তাশদীদ এবং তানভীন যুক্ত শব্দ",
            column: [
              "দ্বাম্মাহ তানভীনের সাথে",
              "কাসরাহ তানভীনের সাথে",
              "ফাতহাহ তানভীনের সাথে",
            ],
            columnEn: ["end", "middle", "start"],
          },
          {
            name: "Words_madd",
            title: "তাশদীদ এবং মাদ্দ যুক্ত শব্দ",
            column: [
              "ওয়াও মাদ্দ এর সাথে",
              "ইয়া মাদ্দ এর সাথে",
              "আলিফ মাদ্দ এর সাথে",
            ],
            columnEn: ["end", "middle", "start"],
          },
        ],
      },
    ],
  },
};

// export async function sendDataToDjango(
//   sdata,
//   address,
//   method = "POST",
//   accessToken = null
// ) {
//   try {
//     const refreshToken = localStorage.getItem("refresh_token");
//     const accessToken = localStorage.getItem("access_token");
//     console.log("accessToken");
//     const options = {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };

//     // Only include body for methods that support it
//     if (method !== "DELETE") {
//       options.body = JSON.stringify(sdata);
//     }

//     const response = await fetch(address, options);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const result = await response.json();
//     console.log("Data sent successfully:", result);
//     location.reload();
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// }

export async function sendDataToDjango(sdata, address, method = "POST") {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Only include body for methods that support it
    if (method !== "DELETE") {
      options.body = JSON.stringify(sdata);
    }

    const response = await fetch(address, options);
    console.log("sendDataToDjango", address, sdata, method, response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data sent successfully:", result);
  } catch (error) {
    console.error("Error sending data:", error);
  }
  location.reload();
}

export async function receiveDataFromDjango(address) {
  try {
    const response = await fetch(address);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
    console.log("Data sent successfully:", result);
  } catch (error) {
    console.error("Error sending data:", error);
    return null;
  }
}


export const classes = [
  {
    "course": "[Batch - 1] React JS (A-Z) For Backend Developer",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/emPohstWs-w",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/ZkpkrVf5PKo",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/6bRmAIpdAyU",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/ggVM3FrGgOc",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/A7bsgez35xk",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/rf7rTlQhQmE",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/MQicnY_E0M0",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/nafdMy-kzZM",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/wIVagEjC0To",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/0yY8t_6RI-E",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/ETCxqsaJ8I0",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/NZJBOMAUaK8",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/7WMylLXaGWI",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/6Pi_MfHtKj8",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/t0rGA8lezYg",
        "topic" : "",
      },
      {

        "class": "Class - 16",
        "link": "https://youtu.be/AQxwXLvt97w",
        "topic" : "",
      },
      {

        "class": "Class - 17",
        "link": "https://youtu.be/r3hGfB35LEs",
        "topic" : "",
      },
      {

        "class": "Class - 18",
        "link": "https://youtu.be/AsJfLqfFhUc",
        "topic" : "",
      },
      {

        "class": "Class - 19",
        "link": "https://youtu.be/MFB6AJGdPuU",
        "topic" : "",
      },
      {

        "class": "Class - 20",
        "link": "https://youtu.be/ivHQvHOOiYw",
        "topic" : "",
      }
    ]
  },
  {
    "course": "[Batch - 1] Theory of Machine Learning (A-Z in Bangla) - Pre-recorded",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/Bh769l-5wjU",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/7DQlk7f9-fg",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/0a-iN-uBGwk",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/F1DjzUIT7yU",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/mIuAmgBf4lE",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/neSJx3qTh5w",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/lCSEyGKq0LM",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/599Tao8WZ9Y",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/HUG_eVWpGGE",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/cYWUcmGvW1s",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/aYoK-7BdNNE",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/VL4-x3zqmqU",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/l3tiaCYqFGc",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/fhk2ruTiYq0",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/SVVOY_Pqyqg",
        "topic" : "",
      },
      {

        "class": "Class - 16",
        "link": "https://youtu.be/8U-Krh9ttPg",
        "topic" : "",
      },
      {

        "class": "Class - 17",
        "link": "https://youtu.be/hKgVAvtjHFE",
        "topic" : "",
      },
      {

        "class": "Class - 18",
        "link": "https://youtu.be/na4yQFsD5fs",
        "topic" : "",
      },
      {

        "class": "Class - 19",
        "link": "https://youtu.be/eKlAEq8l0kc",
        "topic" : "",
      },
      {

        "class": "Class - 20",
        "link": "https://youtu.be/Zn7xRw9nSxc",
        "topic" : "",
      },
      {

        "class": "Class - 21",
        "link": "https://youtu.be/onhgx2J4iGI",
        "topic" : "",
      },
      {

        "class": "Class - 22",
        "link": "https://youtu.be/5IjAsm1TFu8",
        "topic" : "",
      },
      {

        "class": "Class - 23",
        "link": "https://youtu.be/tQE5QIa_sWw",
        "topic" : "",
      }
    ]
  },
  {
    "course": "[Batch - 1] Python Fundamentals with Object Oriented Programming (OOP)",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/Nja58BErEBw",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/2_U_g33PoNk",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/JwTxo-2txjY",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/mKiJEUnqy3I",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/NmSp5iBSAQg",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/IpT-ugWP0kc",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/2_I2ahij0Rk",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/w0mNjLNRi5Q",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/fwNhwaIwjnQ",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/c42LZLUcNsI",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/Q0j8eUN0560",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/oeUi18eRlkI",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/EhoSfJgGCzI",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/gu7bsjN-v-0",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/A5BsCKh2GwQ",
        "topic" : "",
      },
      {

        "class": "Class - 16",
        "link": "https://youtu.be/Ugqi_844Tso",
        "topic" : "",
      },
      {

        "class": "Class - 17",
        "link": "https://youtu.be/AIOdl9wbBJI",
        "topic" : "",
      },
      {

        "class": "Class - 18",
        "link": "https://youtu.be/tLNgrgp9l4M",
        "topic" : "",
      },
      {

        "class": "Class - 19",
        "link": "https://youtu.be/bYeXLCtn6DE",
        "topic" : "",
      },
      {

        "class": "Class - 20",
        "link": "https://youtu.be/VTacVsjClro",
        "topic" : "",
      },
      {

        "class": "Class - 21",
        "link": "https://youtu.be/VTacVsjClro",
        "topic" : "",
      }
    ]
  },
  {
    "course": "[Batch - 1] Pandas in Python (A-Z in Bangla)",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/krlzhJ0RyYY",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/RWZVznXeNKU",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/wyFOL6Syv8c",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/s9NwoqfM7ts",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/ie7mcGMFt9Y",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/qos-kYZzMCI",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/J5zkhTAJx8M",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/aWpvA8SyCK0",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/u8Kbj22vc1I",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/HVFaciXdSuY",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/ZaLcFDagRZE",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/BSI6Lnk7i7k",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/mZ4rBrvE_Ik",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/f0K3FcUJ8xk",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/oBIOPN5q_I0",
        "topic" : "",
      }
    ]
  },
  {
    "course": "[Batch - 4] AI Based Software Development With Python",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/xUO7QNzJNlM",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/DnunPdwCZ_I",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/kG4NYuR07xI",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/UM40MBv7vFg",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/cb-NNEfeTvY",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/mceWcdwrsQc",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/N5Ic098f_lo",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/5jmu24XETIQ",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/lYagkP5GMG0",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/3BnXfAHLBYY",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/DrIUAbC-TiE",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/4Tp2BXuvPAw",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/ZJzXpOKiWmc",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/F3sfq1zMXYY",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/2_JhMxFPoik",
        "topic" : "",
      },
      {

        "class": "Class - 16",
        "link": "https://youtu.be/KCIHJn9N5gs",
        "topic" : "",
      },
      {

        "class": "Class - 17",
        "link": "https://youtu.be/E6Vuebfk1ek",
        "topic" : "",
      },
      {

        "class": "Class - 18",
        "link": "https://youtu.be/hqUbH6qsYmU",
        "topic" : "",
      },
      {

        "class": "Class - 19",
        "link": "https://youtu.be/egX9wZv6bLY",
        "topic" : "",
      },
      {

        "class": "Class - 20",
        "link": "https://youtu.be/S6c9x60yeRk",
        "topic" : "",
      },
      {

        "class": "Class - 21",
        "link": "https://youtu.be/0dM8Bn6sqIY",
        "topic" : "",
      },
      {

        "class": "Class - 22",
        "link": "https://youtu.be/Iae7enzthHc",
        "topic" : "",
      },
      {

        "class": "Class - 23",
        "link": "https://youtu.be/2KHx-sMJEIM",
        "topic" : "",
      },
      {

        "class": "Class - 24",
        "link": "https://youtu.be/WhdZDCfakbE",
        "topic" : "",
      },
      {

        "class": "Class - 25",
        "link": "https://youtu.be/fZNLmRR6CRM",
        "topic" : "",
      },
      {

        "class": "Class - 26",
        "link": "https://youtu.be/MbRF6ACw5pE",
        "topic" : "",
      },
      {

        "class": "Class - 27",
        "link": "https://youtu.be/-Io5Hxv3U8k",
        "topic" : "",
      },
      {

        "class": "Class - 28",
        "link": "https://youtu.be/v5dqVRymBQE",
        "topic" : "",
      },
      {

        "class": "Class - 29",
        "link": "https://youtu.be/i44TZ09kK-k",
        "topic" : "",
      },
      {

        "class": "Class - 30",
        "link": "https://youtu.be/uBjF2VKfU2U",
        "topic" : "",
      },
      {

        "class": "Class - 31",
        "link": "https://youtu.be/CYeT_lOhdsc",
        "topic" : "django install and setup",
      },
      {

        "class": "Class - 32",
        "link": "https://youtu.be/oAAuhJjsljk",
        "topic" : "",
      },
      {

        "class": "Class - 33",
        "link": "https://youtu.be/gNCuTnvcY6o",
        "topic" : "",
      },
      {

        "class": "Class - 34",
        "link": "https://youtu.be/_RX69Zo6jdE",
        "topic" : "",
      },
      {

        "class": "Class - 35",
        "link": "https://youtu.be/fbGTGxl1I5c",
        "topic" : "",
      },
      {

        "class": "Class - 36",
        "link": "https://youtu.be/DwmumYPdiEI",
        "topic" : "DRF",
      },
      {

        "class": "Class - 37",
        "link": "https://youtu.be/Bn4lYUJhcHY",
        "topic" : "",
      },
      {

        "class": "Class - 38",
        "link": "https://youtu.be/wQryMbBaoRc",
        "topic" : "",
      },
      {

        "class": "Class - 39",
        "link": "https://youtu.be/0ilTL4f95eg",
        "topic" : "",
      },
      {

        "class": "Class - 40",
        "link": "https://youtu.be/ps23rxQ-pfI",
        "topic" : "",
      },
      {

        "class": "Class - 41",
        "link": "https://youtu.be/3UiOYTpjQ1k",
        "topic" : "",
      },
      {

        "class": "Class - 42",
        "link": "https://youtu.be/wOgJgjQrTiI",
        "topic" : "",
      },
      {

        "class": "Class - 43",
        "link": "https://youtu.be/6SH7c88i4I0",
        "topic" : "",
      },
      {

        "class": "Class - 44",
        "link": "https://youtu.be/kdpNouQxtjA",
        "topic" : "",
      },
      {

        "class": "Class - 45",
        "link": "https://youtu.be/myWCyc02D3Y",
        "topic" : "",
      },
      {

        "class": "Class - 46",
        "link": "https://youtu.be/7gy_2cXoMUE",
        "topic" : "",
      },
      {

        "class": "Class - 47",
        "link": "https://youtu.be/kJbJv1vGMSM",
        "topic" : "",
      },
      {

        "class": "Class - 48",
        "link": "https://youtu.be/abAL51O1cFE",
        "topic" : "",
      },
      {

        "class": "Class - 49",
        "link": "https://youtu.be/sMJxQXD93P0",
        "topic" : "",
      },
      {

        "class": "Class - 50",
        "link": "https://youtu.be/IIWW3gtu_h8",
        "topic" : "",
      },
      {

        "class": "Class - 51",
        "link": "https://youtu.be/JrKYtk1gPH4",
        "topic" : "",
      },
      {

        "class": "Class - 52",
        "link": "https://youtu.be/iF0zOA_lwPI",
        "topic" : "",
      },
      {

        "class": "Class - 53",
        "link": "https://youtu.be/l_yyR4ELBX4",
        "topic" : "",
      },
      {

        "class": "Class - 54",
        "link": "https://youtu.be/K3HU-ipP-ps",
        "topic" : "",
      },
      {

        "class": "Class - 55",
        "link": "https://youtu.be/L1YZFe1ibuQ",
        "topic" : "",
      },
      {

        "class": "Class - 56",
        "link": "https://youtu.be/5AMBXl6KvUg",
        "topic" : "",
      },
      {

        "class": "Class - 57",
        "link": "https://youtu.be/goPi6-QRuLc",
        "topic" : "",
      },
      {

        "class": "Class - 58",
        "link": "https://youtu.be/iOcAEIOdyaA",
        "topic" : "",
      },
      {

        "class": "Class - 59",
        "link": "https://youtu.be/ouuVr8TIcNU",
        "topic" : "",
      },
      {

        "class": "Class - 60",
        "link": "https://youtu.be/XOgCdxIwBko",
        "topic" : "",
      },
      {

        "class": "Class - 61",
        "link": "https://youtu.be/wL1FDfvB0qM",
        "topic" : "",
      },
      {

        "class": "Class - 62",
        "link": "https://youtu.be/SwLqrMuUbZM",
        "topic" : "",
      },
      {

        "class": "Class - 63",
        "link": "https://youtu.be/bxVi2qoO3RE",
        "topic" : "",
      },
      {

        "class": "Class - 64",
        "link": "https://youtu.be/5TY6ezUDnqI",
        "topic" : "",
      },
      {

        "class": "Class - 65",
        "link": "https://youtu.be/TQy8SXBSXC0",
        "topic" : "",
      }
    ]
  },
  {
    "course": "[Batch - 2] Deep Learning with Computer Vision",
    "classes": [
      {

        "class": "Class - 1",
        "link": "https://youtu.be/HvpLoBMe1zc",
        "topic" : "",
      },
      {

        "class": "Class - 2",
        "link": "https://youtu.be/1hh-wPN8DPA",
        "topic" : "",
      },
      {

        "class": "Class - 3",
        "link": "https://youtu.be/dA9OivVzh2E",
        "topic" : "",
      },
      {

        "class": "Class - 4",
        "link": "https://youtu.be/3XXucFkXX1w",
        "topic" : "",
      },
      {

        "class": "Class - 5",
        "link": "https://youtu.be/lPxDlavplxE",
        "topic" : "",
      },
      {

        "class": "Class - 6",
        "link": "https://youtu.be/FtLwaL5Djsk",
        "topic" : "",
      },
      {

        "class": "Class - 7",
        "link": "https://youtu.be/W7A0Xdq3tUQ",
        "topic" : "",
      },
      {

        "class": "Class - 8",
        "link": "https://youtu.be/Qd_RK27G6r0",
        "topic" : "",
      },
      {

        "class": "Class - 9",
        "link": "https://youtu.be/p52XrckqOac",
        "topic" : "",
      },
      {

        "class": "Class - 10",
        "link": "https://youtu.be/GqJD_JJ_xX4",
        "topic" : "",
      },
      {

        "class": "Class - 11",
        "link": "https://youtu.be/YTiDSspUeSQ",
        "topic" : "",
      },
      {

        "class": "Class - 12",
        "link": "https://youtu.be/2PpCAgsH2iA",
        "topic" : "",
      },
      {

        "class": "Class - 13",
        "link": "https://youtu.be/Gd4fRzo7k-g",
        "topic" : "",
      },
      {

        "class": "Class - 14",
        "link": "https://youtu.be/SxeqqHJ2qlQ",
        "topic" : "",
      },
      {

        "class": "Class - 15",
        "link": "https://youtu.be/qOZXyGAx-oo",
        "topic" : "",
      },
      {

        "class": "Class - 16",
        "link": "https://youtu.be/FPNxYE1YqG4",
        "topic" : "",
      },
      {

        "class": "Class - 17",
        "link": "https://youtu.be/5ryvNrUOIc0",
        "topic" : "",
      },
      {

        "class": "Class - 18",
        "link": "https://youtu.be/QE3raTG-j9g",
        "topic" : "",
      },
      {

        "class": "Class - 19",
        "link": "https://youtu.be/MEiIuJGeWgo",
        "topic" : "",
      },
      {

        "class": "Class - 20",
        "link": "https://youtu.be/_l3PQj0lnYc",
        "topic" : "",
      },
      {

        "class": "Class - 21",
        "link": "https://youtu.be/Xs6gPpGyW7M",
        "topic" : "",
      },
      {

        "class": "Class - 22",
        "link": "https://youtu.be/CFIe5FSqdi4",
        "topic" : "",
      }
    ]
  }
]




{
  /* ayah image container */
}
{
  /* <div
id="imageframe"
className="hidden z-20 fixed top-0 bg-gray-100 w-[1500px]"
>
<button
  className="w-8 h-8  bg-gray-100 rounded-lg hover:bg-red-200"
  onClick={() => {
    document.getElementById("imageframe").classList.toggle("hidden");
  }}
>
  <SquareX className="w-7 h-7 text-red-500"></SquareX>
</button> */
}
{
  /* <Audio
  folder={''}
/> */
}
{
  /* <button
  className="w-8 h-8  bg-gray-100 rounded-lg hover:bg-red-200"
  onClick={() => {
    const src = document
      .getElementById("image")
      .src.split("a/")[1]
      .split(/[_\.]/);
    console.log(
      "/wbw/" +
        src[0].padStart(3, "0") +
        "/" +
        reciter +
        "/" +
        src[0].padStart(3, "0") +
        src[1].padStart(3, "0") +
        ".mp3"
    );
    document.getElementById(position + id + "Audio").src =
      "/wbw/" +
      src[0].padStart(3, "0") +
      "/" +
      reciter +
      "/" +
      src[0].padStart(3, "0") +
      src[1].padStart(3, "0") +
      ".mp3";
    document.getElementById(position + id + "Audio").play();
    document.getElementById(position + id + "Audio").classList =
      "hidden";
  }}
>
  <CirclePlay className="w-7 h-7 text-red-500" />
</button>
<img id="image" className="bg-white" src="" />

<div
  id="ayahShow"
  className=" bg-green-100 p-4 rounded shadow-md"
></div>
</div> */
}
{
  /* refference table container */
}
{
  /* <table className="text-2xl table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  ক্রমিক{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  রেফারেন্স{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500"> সুরা </th>
                <th className="border-2 font-bangla border-gray-500"> আয়াত </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  স্থান{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500"> শব্দ </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  শব্দ অডিও{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  আয়াত অডিও{" "}
                </th>
              </tr>
            </thead>
            <tbody key={`${position}${id}tbody`}>
              {refData.map((item, index) => (
                <tr key={`${position}${id}${index}trow`}>
                  <td className="border-2 border-gray-500">{index + 1}</td>

                  <td className="border-2 border-gray-500"> */
}
{
  /* ayah ref */
}
//   <button
//     onClick={async () => {
//       const refAyah = await receiveDataFromDjango(
//         rootAddress +
//           "quran-words/filter_by_sura?sura=" +
//           item.sura +
//           "&aya=" +
//           item.aya
//       );
//       const src =
//         "/aba/" + item.sura + "_" + item.aya + ".png";
//       console.log(src);
//       document.getElementById("image").src = src;
//       document
//         .getElementById("imageframe")
//         .classList.toggle("hidden");

//       const ayah = refAyah
//         .map((item1) => item1.text)
//         .join(" ");
//       console.log(ayah);
//       document.getElementById("ayahShow").innerText = ayah;
//     }}
//   >
//     <BookOpenText className="w-7 h-7 text-green-800" />
//   </button>
// </td>
// <td className="border-2 border-gray-500">{item.sura}</td>
// <td className="border-2 border-gray-500">{item.aya}</td>
// <td className="border-2 border-gray-500">{item.position}</td>
// <td className="border-2 border-gray-500">{item.text}</td>
// <td className="border-2 border-gray-500 ">
//   {/* every word audio */}
//   <button
//     onClick={async () => {
//       try {
//         const src =
//           "/wbw" + item.audio.substring(0, 4) + item.audio;
//         console.log(src);
//         document.getElementById(position + id + "Audio").src =
//           src;
//         document
//           .getElementById(position + id + "Audio")
//           .play();
//         document.getElementById(
//           position + id + "Audio"
//         ).classList = "hidden";
//       } catch (error) {
//         console.error("❌ Error fetching data:", error);
//       }
//     }}
//   >
//     <CirclePlay className="w-7 h-7 text-green-500" />
//   </button>
// </td>
// <td className="border-2 border-gray-500">
//   {/* ayah ref audio */}
//           <button
//             onClick={async () => {
//               try {
//                 const src =
//                   "/wbw" +
//                   item.audio.substring(0, 4) +
//                   "/" +
//                   reciter +
//                   "" +
//                   item.audio.substring(0, 4) +
//                   item.audio.substring(5, 8) +
//                   ".mp3";
//                 console.log(src);
//                 document.getElementById(position + id + "Audio").src =
//                   src;
//                 document
//                   .getElementById(position + id + "Audio")
//                   .play();
//                 document.getElementById(
//                   position + id + "Audio"
//                 ).classList = "hidden";
//               } catch (error) {
//                 console.error("❌ Error fetching data:", error);
//               }
//             }}
//           >
//             <CirclePlay className="w-7 h-7 text-red-500" />
//           </button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
