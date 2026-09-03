import React from 'react';
import { useApp } from '../../context/AppContext';
import { DriverDashboard } from './DriverDashboard';
import { DriverMyTrips } from './DriverMyTrips';
import { DriverRouteDetails } from './DriverRouteDetails';
import { DriverPassengerList } from './DriverPassengerList';
import { DriverNotifications } from './DriverNotifications';
import { DriverProfile } from './DriverProfile';

export const DriverViewRenderer: React.FC = () => {
  const { driverView } = useApp();

  switch (driverView) {
    case 'dashboard':
      return <DriverDashboard />;
    case 'my_trips':
      return <DriverMyTrips />;
    case 'route_details':
      return <DriverRouteDetails />;
    case 'passenger_list':
      return <DriverPassengerList />;
    case 'notifications':
      return <DriverNotifications />;
    case 'profile':
      return <DriverProfile />;
    default:
      return <DriverDashboard />;
  }
};
