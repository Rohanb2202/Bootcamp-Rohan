export interface Paper {
    description?: string
  }
  
  export interface SearchBarProps {
    onSelect: (Papers: Paper | null) => void
  }
  
  export interface ResultsDisplayProps {
    Papers: Paper
  }
  