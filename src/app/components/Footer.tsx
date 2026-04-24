import { Button } from "./Button";
import { Input } from "./Input";

const cols = [
  {
    id: 1,
    title: "About",
    links: [
      { title: "About Us", href: "" },
      { title: "Careers", href: "" },
      { title: "Press", href: "" },
    ],
    type: "default",
  },
  {
    id: 2,
    title: "Support",
    links: [
      { title: "Contact", href: "" },
      { title: "FAQ", href: "" },
      { title: "Shipping", href: "" },
    ],
    type: "default",
  },
  {
    id: 3,
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "" },
      { title: "Terms of Service", href: "" },
      { title: "Returns", href: "" },
    ],
    type: "default",
  },
  {
    id: 4,
    title: "Newsletter",
    description: "Subcribe for exclusive deals",
    type: "withForm",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-t-border">
      <div className="max-w-360 w-full mx-auto px-8 py-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {cols.map((col, index) => {
          return col.type === "default" ? (
            <div key={index} className="grid gap-3">
              <h3 className="text-lg font-medium">{col.title}</h3>
              <div className="grid gap-2">
                {col.links?.map((link, index) => {
                  return (
                    <a
                      href={link.href}
                      key={index}
                      className="text-grayText"
                    >
                      {link.title}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="text-lg font-medium">{col.title}</h3>
              <p className="text-grayText">{col.description}</p>
              <div className="flex gap-2">
                <Input placeholder="Email" />
                <Button variant="primary" title="Subscribe" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-w-360 w-full mx-auto px-8">
        <div className="py-8 border-t border-t-border">
          <p className="text-center text-grayText">
            © 2026 TechStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
