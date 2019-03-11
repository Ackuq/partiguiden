/* Import icon */
import InfoIcon from "@material-ui/icons/Info";
/* Next.js Head component */
import Head from "next/head";

export default () => (
  <React.Fragment>
    <Head>
      <title>Om oss | Partiguiden.nu</title>
    </Head>
    <div className="list-title text-center">
      <InfoIcon style={{ fontSize: "2.5rem" }} />
      <h1>Om oss</h1>
    </div>
    <div className="container">
      <p>
        Partiguiden.nu skapades med syftet av att kunna erbjuda en plattform där
        man lätt kan kolla upp partiernas ståndpunkter i olika ämnen och
        sakfrågor. Under utvecklingen av hemsidan togs det hänsyn till
        begriplighet och användarvänlighet för att kunna erbjuda den bästa
        möjliga användarupplevensen.
      </p>
      <p>
        Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för att
        utveckla kunskaper inom webbutveckling.
      </p>
      <p>
        Informationen som presenteras på sidan är utvald information från
        partiernas egna hemsidor.
      </p>
    </div>
  </React.Fragment>
);
