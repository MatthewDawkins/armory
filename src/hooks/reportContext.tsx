import React from "react";
import { useContext } from "react";

type Props = {
  children: React.ReactNode;
  parseReport: any[];
};

export const ReportContext = React.createContext([{}, () => {}]);

export const ReportContextProvider = ({ parseReport, children }: Props) => {
  const [report, setReport] = React.useState(parseReport);


  return (
    <ReportContext.Provider value={[report, setReport]}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  React.useContext(ReportContext)
}

