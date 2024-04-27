
const Copyright = () => {
  return (
    <span>© 2024 FlatFinder. All right's reserved.</span>
  );
};

const LinksColumn = ({ title, links }: {title:string, links: {label: string, url: string}[]}) => {
  return (
    <span className="flex flex-col">
      <h4 className="font-semibold text-[16px]">{title}</h4>
      {links.map((link, index) => (
        <a className="hover:underline cursor-pointer" key={index} href={link.url}>{link.label}</a>
      ))}
    </span>
  );
};


const Footer = () => {

  const columns = [
    {
      title: 'About Us',
      links: [
        { label: 'Privacy', url: '#' },
        { label: 'Cookies', url: '#' },
        { label: 'About', url: '#' },
        { label: 'Careers', url: '#' },
      ],
    },
    {
      title: 'Useful Information',
      links: [
        { label: 'Terms', url: '#' },
        { label: 'Member Terms', url: '#' },
        { label: 'Tax Strategy', url: '#' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'contact@mail.com', url: ''},
        { label: 'FAX: 0123 456 7890', url: ''},
        { label: 'Mobile: +0123 456 789', url: ''},
      ],
    },
  ];

  return (
    <footer className="bg-[#274F5C] py-7 pl-[6rem] text-white flex flex-col gap-[25px]">
      <div className="container mx-auto">
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Copyright />
          {columns.map((column, index) => (
            <LinksColumn key={index} title={column.title} links={column.links} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
