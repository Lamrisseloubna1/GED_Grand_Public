import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ThematicCards from "@/components/ThematicCards"; // Import the ThematicCards component

export const metadata = {
    title: "title",
    description: "description here",
};

const TablesPage = () => {
    return (
        <DefaultLayout>
            <div style={{ margin: '20px' }}>
                <ThematicCards /> {/* Add the ThematicCards component */}
            </div>
        </DefaultLayout>
    );
};

export default TablesPage;
