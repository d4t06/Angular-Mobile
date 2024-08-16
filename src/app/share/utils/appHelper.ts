export const sleep = (time: number) => new Promise<void>(rs => setTimeout(rs, time));

export const newArray = (count: number) => {
   return [...Array(count).keys()];
};
