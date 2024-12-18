import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  if (!dateString) {
    console.warn("Warning: dateString is undefined or missing.");
    return null; // Don't render anything if dateString is missing
  }

  try {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>;
  } catch (error) {
    console.error("Invalid dateString format:", dateString);
    return <time>{`Invalid date`}</time>; // Fallback text
  }
}
