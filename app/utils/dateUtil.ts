export const FORMAT_DATE = 'dd/MM/yyyy'; //25/05/2022
export const FORMAT_DATETIME = 'dd/MM/yyyy HH:mm:ss'; //25/05/2022 17:26:31
export const FORMAT_DATE1 = 'dd MMM yyyy'; //25 JAn 2022
export const FORMAT_DATE2 = 'dd MMMM yyyy'; //25 May 2022
export const FORMAT_DATE3 = 'E dd MMMM yyyy'; //Wed 25 May 2022
export const FORMAT_DATE4 = 'EEEE dd MMMM yyyy'; //Wednesday 25 May 2022
export const FORMAT_DATE5 = 'E dd MMM yyyy'; //Wed 25 Jan 2022
export const FORMAT_DATE6 = 'PPP'; //May 25th, 2022
export const FORMAT_DATE7 = 'PPPppp'; //May 25th, 2022 at 5:26:31 PM GMT+7
export const FORMAT_DATE8 = 'E dd MMMM yyyy HH:mm:ss'; //Wed 25 May 2022 17:26:31
export const FORMAT_DATE9 = 'dd MMMM yyyy HH:mm:ss'; //25 May 2022 17:26:31
export const FORMAT_DATE10 = 'yyyy/MM/dd'; //2022/05/25
export const FORMAT_DATE11 = 'PPPp'; //April 28th, 2022 at 11:30 AM
export const FORMAT_DATE12 = 'PPp'; //Apr 28, 2022, 11:30 AM
export const FORMAT_DATE13 = 'yyyy-MM-dd HH:mm:ss';
export const FORMAT_DATE14 = 'yyyy-MM-dd';
export const FORMAT_DATE15 = 'aaa'; //am, pm
export const FORMAT_DATE16 = 'dd/MM/yy'; //25/05/22
export const FORMAT_DATE17 = 'dd/MM/yyyy HH:mm'; //25/05/2022 17:26
export const FORMAT_DATE18 = 'HH:mm'; //17:26
export const FORMAT_DATE19 = 'dd/MM'; //25/05
export const FORMAT_DATE20 = 'dd/MM HH:mm'; //25/05
export const addDateByDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
export const addDateByDaysV2 = (d: Date, days: number) => {
  d.setDate(d.getDate() + days);
  return d;
};
export const getDateNow = () => {
  return new Date();
};
export const getYearNow = () => {
  return new Date().getFullYear();
};
export const getMonthNow = () => {
  return new Date().getMonth();
};
export const getCurrentTimestamp = () => {
  return Date.now();
};
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');  // Ensure two digits
  const minutes = String(now.getMinutes()).padStart(2, '0');  // Ensure two digits
  return `${hours}:${minutes}`;
};
export const getCurrentDateByFormat = (
  forMatString: string | undefined = FORMAT_DATE14// yyyy-MM-dd
) => {
  return formatDateBy(getDateNow(), forMatString);
};
export const formatDateBy = (date: Date, formatString: string): string => {
  const padZero = (num: number) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are 0-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return formatString
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};
export const convertDateFormatToThai = (dateString?: string | null) => {
  //convert YYYY-MM-DD to DD/MM/YYYY
  if (!dateString) {
    return undefined;
  }
  const parts = dateString.split('-');
  return parts[2] + '/' + parts[1] + '/' + parts[0];
};
export const convertThaiDateFormatToEng = (dateString?: string | null) => {
  //convert DD/MM/YYYY to YYYY-MM-DD
  if (!dateString) {
    return undefined;
  }
  const parts = dateString.split('/');
  return parts[2] + '-' + parts[1] + '-' + parts[0];
};
export const isDate2GreaterThan = (d1: Date, d2: Date) => {
  return d2.getTime() > d1.getTime();
};
export const isDate2GreaterOrEqualThanOnlyDate = (d1: Date, d2: Date) => {
  const tempDate2 = new Date(
    d2.getFullYear(),
    d2.getMonth(),
    d2.getDate(),
    0,
    0,
    0,
    0
  );
  const tempDate1 = new Date(
    d1.getFullYear(),
    d1.getMonth(),
    d1.getDate(),
    0,
    0,
    0,
    0
  );
  return tempDate2.getTime() >= tempDate1.getTime();
};
export const removeTime = (datetimeString: string) => {
  return datetimeString ? datetimeString.split(' ')[0] : '';
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${remainingMinutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }
  return parts.join(" ");
}