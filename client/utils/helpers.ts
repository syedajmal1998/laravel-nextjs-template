import uuid from "react-uuid";

export function makeFileUrl(file: File) {
    const fileOriginalName = file.name.match(/^.*?([^\\/.]*)[^\\/]*$/)[1]
    const fileExtension = file.name.split('.').pop();
    const slug = convertToSlug(fileOriginalName)
    const url = URL.createObjectURL(file);
    return {
        id: uuid(),
        filename: slug,
        url,
        fileExtension,
        alt: fileOriginalName,
        file
    }
}
export function convertToSlug(Text, strip = false) {
    Text = Text.toLowerCase()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
    if (strip) Text
        .replace(/^-+/, "")
        .replace(/-+$/, "")
    return Text;
}
export const getUniqueItems = <T extends unknown>(items: T[], key: string): T[] => {
    const locks: Record<string, boolean> = {};
    const result: T[] = [];
    for (const item of items) {
        if (key in locks) {
            continue;
        }
        locks[key] = true;
        result.push(item);
    }
    return result;
};

export const generateFormData = (data: Object, method = 'post', isProduct = false): FormData => {
    const formData = new FormData();
    formData.append('_method', method);
    for (const key in data) {
        if (data[key]) {
            if (data[key] instanceof File) formData.append(key, data[key])
            if (!(data[key] instanceof File) && typeof data[key] == 'object' && Array.isArray(data[key]) && data[key].every(file => file instanceof File)) data[key]?.forEach(file => formData.append(key + '[]', file));
            else {
                formData.append(key, typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key])
            }
        }
    }
    console.log(formData.values(), data);

    return formData;
};

export function CopyToClipboard(nodeId) {
    const elm = document.getElementById(nodeId);
    // for Internet Explorer
    //@ts-ignore
    if (document.body.createTextRange) {
        //@ts-ignore
        const range = document.body.createTextRange();
        range.moveToElementText(elm);
        range.select();
        document.execCommand("Copy");

    }
    else if (window.getSelection) {
        // other browsers

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(elm);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy");

    }
}