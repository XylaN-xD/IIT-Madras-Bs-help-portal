import { addHours, setHours, setMinutes } from 'date-fns';

export interface Assignment {
  week: number;
  unlockDate: Date;
  pdfUrl: string | null;
  title: string;
}

const createDateTime = (date: Date, hours: number, minutes: number) => {
  return setMinutes(setHours(date, hours), minutes);
};

export const generateAssignments = (startDate: Date): Assignment[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const baseDate = addHours(startDate, i * 168);
    const unlockDate = createDateTime(baseDate, 18, 0);

    return {
      week: i + 1,
      unlockDate,
      pdfUrl: null,
      title: `Week ${i + 1} Assignment`,
    };
  });
};

export const updateAssignment = (
  assignments: Assignment[],
  week: number,
  updates: Partial<Assignment>
): Assignment[] => {
  return assignments.map(assignment =>
    assignment.week === week
      ? { ...assignment, ...updates }
      : assignment
  );
};