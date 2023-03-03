export function getQuery() {
    const search = document.location.search
      .substring(1)
      .split('&')
      .reduce<Record<string, string>>((acc, equalString) => {
        const [name, value = 'true'] = equalString.split('=')
        acc[name] = decodeURIComponent(value)
        return acc
      }, {})

    return search
  }