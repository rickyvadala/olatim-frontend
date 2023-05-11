export const serializedDate = (date: string | null) => {
    return date ? new Date(date).getFullYear().toString() : date;
};
