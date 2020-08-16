export interface MemberType {
  id: number;
  age: number;
  constituency: string;
  role: string;
  name: string;
  status: string;
  picture: string;
  party: string;
}

export interface MemberDocument {
  authority: string;
  title: string;
  subtitle: string;
  altTitle: string;
  id: string;
}

export interface MemberDocuments {
  pages: number;
  count: number;
  documents: Array<MemberDocument>;
}
