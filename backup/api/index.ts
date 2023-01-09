export const requests = {
    getAfisha: async () => {
        const response = await fetch("https://newtime.binarywd.com/jsonfeed/afisha", {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "post-check=0, pre-check=0",
              Pragma: "no-cache"
            }
        })

        const result = await response.json()

        return result
        
    }
}