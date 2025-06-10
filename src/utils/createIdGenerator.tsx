export default function createIdGenerator() {
    let counter = 1;
    return () => counter++
}