"use client";

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
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function sidebar() {
  return (
    <div className="h-[calc(95vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-2 ">
      <div className="mt-2 ml-2">
        <h1 className="text-xl text-gray-900 font-semibold">Sidebar</h1>
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

        <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <a href="../owners">
        <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Owners
        </ListItem>
        </a>

        <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>

        <ListItem className="hover:bg-slate-100 hover:text-slate-900 flex gap-2 text-1xl font-plain m-1 p-2">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </div>
    </div>
  );
}

export default sidebar;
