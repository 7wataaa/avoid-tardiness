export const useNow = (interval = 1000): [Date] => {
  const [time, setTime] = React.useState(new Date())
  const updateTime = (): void => setTime(new Date())

  React.useEffect(() => {
    const _timer = setInterval(updateTime, interval)
    return (): void => clearInterval(_timer)
  }, [interval])

  return [time]
}
