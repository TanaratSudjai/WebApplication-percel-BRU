import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  DocumentTextIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

function Sidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "staff") {
    return router.push('/');
  }

  return (
    <div className="h-[calc(80vh-2rem)] w-full max-w-[20rem] p-4">
      <div className="mt-2 ml-2 flex justify-center items-center gap-2">
        {session ? (
          <div className="flex justify-center items-center gap-2">
            <div>ยินดีต้อนรับ : {session.user.name} </div>
            <div className="bg-[#60d0ac] h-[10px] w-[10px] rounded-full mt-[1]"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <div>ไม่อณุญาติใช้งาน</div>
            <div className="bg-red-500 h-[10px] w-[10px] rounded-full mt-[1]"></div>
          </div>
        )}
      </div>

      <div className="p-4 gap-4">
        <a href="../mock-table">
          <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
            <ListItemPrefix>
              <PresentationChartBarIcon class="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </a>
        <a href="../addparcel">
          <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Add parcel
          </ListItem>
        </a>
        <a href="../parcel">
          <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage Parcel
          </ListItem>
        </a>
        <a href="../owners">
          <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Owners
          </ListItem>
        </a>

        {session && session.staff && (
          <a href="/welcome">
            <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              หน้าเเรก
            </ListItem>
          </a>
        )}

        <ListItem
          className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </div>
    </div>
  );
}

export default Sidebar;
