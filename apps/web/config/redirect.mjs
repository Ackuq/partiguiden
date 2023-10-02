/**
 * @type {import("next").NextConfig["redirects"]}
 */
const redirects = async () => {
  return [
    {
      source: "/member/",
      destination: "/ledamot",
      permanent: true,
    },
    {
      source: "/member/:id*",
      destination: "/ledamot/:id*",
      permanent: true,
    },
    {
      source: "/about-us",
      destination: "/om-oss",
      permanent: true,
    },
    {
      source: "/vote",
      destination: "/votering",
      permanent: true,
    },
    {
      source: "/vote/:id/:bet*",
      destination: "/votering/:id/:bet*",
      permanent: true,
    },
    {
      source: "/standpoints",
      destination: "/standpunkter",
      permanent: true,
    },
    {
      source: "/party/:party*",
      destination: "/parti/:party*",
      permanent: true,
    },
  ];
};

export default redirects;
