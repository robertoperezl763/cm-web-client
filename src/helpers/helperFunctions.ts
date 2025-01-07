export function toBool(value: string | undefined) {
    if (value?.toLowerCase() === 'true') {
        return true;
    } else {
        return false;
    }
}