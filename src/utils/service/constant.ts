import io from "socket.io-client";
export const GOOGLE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_CLIENT;

export const api_call = process.env.NEXT_PUBLIC_REMOTE_BURL;
export const public_call = process.env.NEXT_PUBLIC_VERCEL_URL;
export const socket = io(api_call || "", {
  path: "/socket.io/",
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

// const divEvenArray = (arr: any[]): any[] => {
//   let arr2: any[] = [];
//   for (let i = 0; i < arr.length - 2; i++) {
//     let sl = arr.slice(i, i + 2);
//     if (sl.length) {
//       // const value = sl?.reduce(
//       //   (acc, curr) => Object.assign(Object.assign(acc, curr), curr),
//       //   {}
//       // );
//       const value = [...sl[0], ...sl[1]];
//       // console.log(value);
//       arr2 = [...arr2, ...sl];
//     }
//   }
//   return arr2;
// };

// divive array into array of subarrays of length 2
// export const subdivideArr = (arr: any) => {
//   let arr2: any[] = [];
//   if (arr.length) return [new Set(arr)];
//   if (arr.length % 2) {
//     let arr1 = arr[arr.length - 1];
//     return [...divEvenArray(arr), ...arr1];
//   } else {
//     return divEvenArray(arr);
//   }
// };
// export const subdivideArr = (arr: any) => {
//   const combinedObject: any = {};

//   arr.forEach((object: any) => {
//     for (const key in object) {
//       combinedObject[key] = object[key];
//     }
//   });
// };

// export const arrObjectToObjectOfObject = (arr: any[]) => {
//   return arr.reduce((obj, item) => {
//     const key = Object.keys(item)[0];
//     obj[key] = item[key];
//     return obj;
//   }, {});
// };

export const arrObjectToObjectOfObject = (arr: any[]) => {
  const subarrays = arr.reduce(
    (acc: object[][], obj: object, index: number) => {
      if (index % 2 === 0) {
        acc.push([obj, {}]);
      } else {
        acc[acc.length - 1].push(obj);
      }
      return acc;
    },
    []
  );
};

// export const subdivideArr = (arr: any[]) => {
//   let arr2: any[] = [];
//   for (let i = 0; i < arr.length - 2; i++) {
//     let sl = arr.slice(i, i + 2);
//     if (sl.length) {
//       const value = { ...sl[0], ...sl[1] };
//       arr2 = [...arr2, value];
//     }
//   }
//   return arr2;
// };

const divEvenArray = (arr: any[]): any[] => {
  let arr2: any[] = [];
  for (let i = 0; i < arr.length - 2; i += 2) {
    let sl = arr.slice(i, i + 2);
    if (sl.length) {
      const value = { ...sl[0], ...sl[1] };
      arr2.push(value);
    }
    sl = [];
  }
  console.log(arr2);
  return arr2;
};

export const subdivideArr = (arr: any) => {
  let arr2: any[] = [];
  if (arr.length) return [new Set(arr)];
  if (arr.length % 2) {
    let arr1 = arr[arr.length - 1];
    return [...divEvenArray(arr), ...arr1];
  } else {
    return divEvenArray(arr);
  }
};
