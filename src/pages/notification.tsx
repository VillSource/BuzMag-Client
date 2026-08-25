import { NotificationPanel } from "@/features/notification/Notification";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NotificationPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <section>
        {!isMobile && (
          <>
            <h1>Notification Page</h1>
            <hr />
          </>
        )}
        {isMobile && <NotificationPanel />}
      </section>
    </>
  );
}
