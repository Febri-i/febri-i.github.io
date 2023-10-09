import {
  JSXElement,
  Show,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import dennisrader from "../assets/DennisRader.png";
import {
  IoCodeWorking,
  IoLogoHtml5,
  IoLogoJavascript,
  IoLogoReact,
} from "solid-icons/io";
import { TbBrandCpp } from "solid-icons/tb";
import { SiTailwindcss } from "solid-icons/si";
import { useTheJazz } from "../App";

export default function Introduction() {
  const articles: JSXElement[] = [
    <div>
      <img
        class="articleFloat w-12 sm:w-16 md:w-24 lg:w-28 xl:w-32 aspect-square object-cover"
        src={dennisrader}
        alt="Dennis Rader"
      />
      <p>
        Dennis Lynn Rader &#40;born March 9, 1945&#41;, also known as BTK (an
        abbreviation he gave himself, for "bind, torture, kill"&#41;, is an
        American serial killer who murdered at least ten people in Wichita and
        Park City, Kansas, between 1974 and 1991. Although Rader occasionally
        killed or attempted to kill men and children, he typically targeted
        women. His victims were often bound, sometimes with objects from their
        homes, and either suffocated with a plastic bag or manually strangled
        with a ligature.
        <br />
        <br />
        In addition, Rader stole keepsakes from his female victims, including
        underwear, licenses, and personal items. He often sent taunting letters
        to police and media outlets describing the details of his crimes. After
        a thirteen-year hiatus, Rader resumed sending letters in 2004, leading
        to his 2005 arrest and subsequent guilty plea. He is currently serving
        ten consecutive life sentences at the El Dorado Correctional Facility.
      </p>
    </div>,
    <p>
      Kabupaten Gunungkidul adalah sebuah wilayah kabupaten yang terletak di
      Daerah Istimewa Yogyakarta, Indonesia. Ibu kota kabupaten ini terletak di
      Kapanewon Wonosari. Nama kabupaten ini berasal dari Bahasa Jawa, yaitu
      "Gunungkidul" &#40;bahasa Indonesia: gunung di selatan&#41;, yang
      wilayahnya terletak di jajaran Pegunungan Sewu, Daerah Istimewa
      Yogyakarta.
      <br />
      <br />
      Dengan luas sekitar sepertiga dari luas daerah induknya, kepadatan
      penduduk di kabupaten ini relatif rendah daripada kabupaten-kabupaten yang
      lainnya. Populasi Gunungkidul pada tahun 2021 berjumlah 758.168 jiwa,
      laki-laki 374.558 jiwa dan perempuan 383.610 jiwa
    </p>,
    <p>
      Teknik Jaringan Komputer dan Telekomunikasi &#40;disingkat TKJ&#41;
      merupakan ilmu berbasis Teknologi Informasi dan Komunikasi terkait
      kemampuan algoritma, dan pemrograman komputer, perakitan komputer,
      perakitan jaringan komputer, dan pengoperasian perangkat lunak, dan
      internet. Teknik komputer, dan jaringan juga membutuhkan pemahaman di
      bidang teknik listrik, dan ilmu komputer sehingga mampu mengembangkan, dan
      mengintegrasikan perangkat lunak, dan perangkat keras.
    </p>,
    <div>
      <IoCodeWorking class="articleFloat" />
      <p>
        Bahasa pemrograman adalah sebuah instruksi standar untuk memerintah
        komputer agar menjalankan fungsi tertentu. Bahasa pemrograman ini
        merupakan suatu himpunan dari aturan sintaksis dan semantik yang dipakai
        untuk mendefinisikan tata olah &#40;program&#41;. Bahasa ini
        memungkinkan seorang penata olah &#40;programmer&#41; dapat menentukan
        secara persis data mana yang akan diolah oleh komputer, bagaimana data
        ini akan disimpan/diteruskan, dan jenis langkah apa yang secara persis
        akan diambil dalam berbagai situasi
      </p>
    </div>,
    <p>
      Back-end development means working on server-side software, which focuses
      on everything you can’t see on a website. Back-end developers ensure the
      website performs correctly, focusing on databases, back-end logic,
      application programming interface (APIs), architecture, and servers. They
      use code that helps browsers communicate with databases, store,
      understand, and delete data.
      <br /> <br />
      On a team, back-end developers collaborate with front-end developers,
      product managers, principal architects, and website testers to build the
      structure of a website or mobile app. Back-end developers must be familiar
      with many kinds of tools and frameworks, including languages such as
      Python, Java, and Ruby. They make sure the back-end performs quickly and
      responsively to front-end user requests.
    </p>,
    <p>
      Front-end web development is the development of the graphical user
      interface of a website, through the use of HTML, CSS, and JavaScript, so
      that users can view and interact with that website.
    </p>,
    <div>
      <IoLogoHtml5 class="articleFloat" />
      <p>
        Hypertext Markup Language (HTML) adalah bahasa markah standar untuk
        dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat
        dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa
        skrip lainnya seperti JavaScript, VBScript, dan PHP. Peramban internet
        menerima dokumen HTML dari server web atau dari penyimpanan lokal dan
        membuat dokumen menjadi halaman web multimedia. HTML menggambarkan
        struktur halaman web secara semantik dan isyarat awal yang disertakan
        untuk penampilan dokumen.
      </p>
    </div>,
    <div>
      <IoLogoJavascript class="articleFloat" />
      <p>
        JavaScript (/ˈdʒɑːvəˌskrɪpt/) (disingkat JS) adalah suatu bahasa
        pemrograman tingkat tinggi dan dinamis. JavaScript populer di internet
        dan dapat bekerja di sebagian besar penjelajah web populer seperti
        Google Chrome, Internet Explorer (IE), Mozilla Firefox, Netscape dan
        Opera. Kode JavaScript dapat disisipkan dalam halaman web menggunakan
        tag script. JavaScript merupakan salah satu teknologi inti World Wide
        Web selain HTML dan CSS. JavaScript membantu membuat halaman web
        interaktif dan merupakan bagian aplikasi web yang esensial.
        <br />
        <br /> Awalnya hanya diimplementasi sebagai client-side dalam penjelajah
        web, kini engine JavaScript disisipkan ke dalam perangkat lunak lain
        seperti dalam server-side dalam server web dan basis data, dalam program
        non web seperti perangkat lunak pengolah kata dan pembaca PDF, dan
        sebagai runtime environment yang memungkinkan penggunaan JavaScript
        untuk membuat aplikasi desktop maupun mobile. JavaScript adalah merek
        dagang yang dikeluarkan dari Oracle Corporation di Amerika Serikat.
      </p>
    </div>,
    <div>
      <SiTailwindcss class="articleFloat" />
      <p>
        Tailwind CSS adalah kerangka kerja (framework) CSS yang di dalamnya
        terdapat sekumpulan utility classes untuk membangun antarmuka kustom
        dengan cepat. Tailwind CSS berbeda dengan kerangka kerja CSS seperti
        Bootstrap, Bulma, atau Foundation, karena Tailwind CSS bukan sebuah UI
        Framework. Tailwind CSS tidak memiliki tema default maupun komponen UI
        bawaan. Tailwind CSS dirancang agar dapat digunakan oleh pengguna sesuai
        dengan desain kustom yang mereka inginkan
      </p>
    </div>,
    <div>
      <IoLogoReact class="articleFloat" />
      <p>
        React adalah libray JavaScript yang digunakan untuk membangun user
        interface yang interaktif berbasis component. React yang dibuat oleh
        Facebook dan bersifat open-source, sehingga dapat digunakan oleh siapa
        saja secara gratis. Saat ini React dikelola oleh Meta, komunitas, dan
        perusahaan individu.
      </p>
    </div>,
    <div>
      <TbBrandCpp class="articleFloat" />
      <p>
        C++ (dibaca: C plus-plus) adalah bahasa pemrograman komputer yang dibuat
        oleh Bjarne Stroustrup, yang merupakan perkembangan dari bahasa C
        dikembangkan di Bell Labs (Dennis Ritchie). Pada awal tahun 1970-an,
        bahasa itu merupakan peningkatan dari bahasa sebelumnya, yaitu B.
        <br />
        <br />
        Pada awalnya, bahasa tersebut dirancang sebagai bahasa pemrograman yang
        dijalankan pada sistem Unix. Pada perkembangannya, versi ANSI (American
        National Standards Institute) pada bahasa pemrograman C menjadi versi
        dominan, meskipun versi tersebut sekarang jarang dipakai dalam
        pengembangan sistem dan jaringan maupun untuk sistem embedded.
      </p>
    </div>,
  ];

  const [currentArticle, setCurrentArticle] = createSignal<number>(-1);
  const doTheJazz = useTheJazz();

  const createMouseEnterHandler = (i: number) => {
    return () => doTheJazz() && setCurrentArticle(i);
  };
  const mouseLeaveCb = () => setCurrentArticle(-1);

  createEffect(() => {
    document.querySelectorAll("a.text-important").forEach((element, index) => {
      element.addEventListener("mouseenter", createMouseEnterHandler(index));
      element.addEventListener("mouseleave", mouseLeaveCb);
    });
  });
  onCleanup(() => {
    document.querySelectorAll("a.text-important").forEach((element, index) => {
      element.removeEventListener("mouseenter", createMouseEnterHandler(index));
      element.removeEventListener("mouseleave", mouseLeaveCb);
    });
  });
  return (
    <div class="w-full  h-full portrait:h-fit">
      <div class="landscape:grid h-full overflow-visible landscape:grid-cols-2  gap-10 ">
        <div class="overflow-y-auto hideScroll portrait:aspect-square portrait:w-full relative">
          <img
            src="https://avatars.githubusercontent.com/febri-i"
            class="absolute inset-0 w-full h-full opacity-0 transition-opacity object-cover grayscale"
            classList={{
              "opacity-100": currentArticle() < 0,
            }}
          ></img>
          <Show when={currentArticle() > -1}>
            <div class="portrait:hidden">{articles[currentArticle()]}</div>
          </Show>
        </div>
        <div class="h-full portrait:mt-10 overflow-y-auto hideScroll flex flex-col">
          <h1>
            Hai nama saya{" "}
            <span
              onmouseenter={() => setCurrentArticle(-1)}
              class="text-important"
            >
              Febri Bayu Nurcahyo
            </span>
            !
          </h1>
          <p>
            Saya lahir pada tanggal{" "}
            <a
              href="https://en.wikipedia.org/wiki/Portal:Current_events/2005_February_25"
              target="_blank"
              class="text-important"
            >
              25 Februari 2005
            </a>{" "}
            di{" "}
            <a
              href="https://id.wikipedia.org/wiki/Kabupaten_Gunungkidul"
              target="_blank"
              class="text-important"
            >
              Gunungkidul
            </a>
            . Saya lulus dari sekolah SMK dengan jurusan{" "}
            <a
              href="https://id.wikipedia.org/wiki/Teknik_komputer_dan_jaringan"
              target="_blank"
              class="text-important"
            >
              Teknik Komputer Jaringan
            </a>{" "}
            pada tahun 2023. Selama saya di SMK saya sudah mempelajari{" "}
            <a
              href="https://id.wikipedia.org/wiki/Bahasa_pemrograman"
              target="_blank"
              class="text-important"
            >
              berbagai bahasa pemrograman dan framework
            </a>
            . Bahasa pemrograman pertama saya adalah php, namun pada akhirnya
            saya{" "}
            <a
              href="https://www.coursera.org/articles/back-end-developer"
              target="_blank"
              class="text-important"
            >
              tidak terlalu minat dengan back-end
            </a>{" "}
            jadi saya mulai mendalami{" "}
            <a
              href="https://en.wikipedia.org/wiki/Front-end_web_development"
              target="_blank"
              class="text-important"
            >
              front-end
            </a>
            . Di bidang front-end saya sudah memplajari mulai dari{" "}
            <a
              href="https://id.wikipedia.org/wiki/HTML"
              target="_blank"
              class="text-important"
            >
              basic HTML
            </a>{" "}
            sampai{" "}
            <a
              href="https://id.wikipedia.org/wiki/JavaScript"
              target="_blank"
              class="text-important"
            >
              Javascript
            </a>{" "}
            dan framework yang saya pelajari adalah{" "}
            <a
              href="https://id.wikipedia.org/wiki/Tailwind_CSS"
              target="_blank"
              class="text-important"
            >
              TailWind
            </a>{" "}
            dan{" "}
            <a
              href="https://id.wikipedia.org/wiki/React.js"
              target="_blank"
              class="text-important"
            >
              ReactJS
            </a>
            . Bahasa pemrograman favorit saya adalah{" "}
            <a
              href="https://id.wikipedia.org/wiki/C%2B%2B"
              target="_blank"
              class="text-important"
            >
              C++
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
