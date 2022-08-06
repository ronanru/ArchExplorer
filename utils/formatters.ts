const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
  relativeFormatter = new Intl.RelativeTimeFormat('en-US', { style: 'short' }),
  dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });

export const formatStorage = (bytes: number) => {
    if (bytes == 0) return '0 Byte';
    const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  },
  formatTime = (dateString: string | number) => {
    const date = new Date(dateString),
      diff = date.getTime() - new Date().getTime();
    if (diff > -3600000) return relativeFormatter.format(Math.round(diff / 60000), 'minute');
    if (diff > -86400000) return relativeFormatter.format(Math.round(diff / 3600000), 'hour');
    if (diff > -2592000000) return relativeFormatter.format(Math.round(diff / 86400000), 'day');
    return dateFormatter.format(date);
  };
