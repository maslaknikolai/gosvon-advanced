export function catcher(cb: () => any) {
    try {
        return cb()
    } catch {
        //
    }
}