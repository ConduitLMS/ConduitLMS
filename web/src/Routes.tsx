// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import SiteLayout from './layouts/SiteLayout/SiteLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route notfound page={NotFoundPage} />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={SiteLayout}>
        <Route path="/organization" page={OrganizationPage} name="organization" />
        <Route path="/marketplace" page={MarketplacePage} name="marketplace" />
        <Route path="/courses" page={CoursesPage} name="courses" />
        <Route path="/testing" page={TestingPage} name="testing" />
        <Route path="/home" page={HomePage} name="home" />
      </Set>
    </Router>
  )
}
/*const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Modules" titleTo="modules" buttonLabel="New Module" buttonTo="newModule">
        <Route path="/modules/new" page={ModuleNewModulePage} name="newModule" />
        <Route path="/modules/{id:Int}/edit" page={ModuleEditModulePage} name="editModule" />
        <Route path="/modules/{id:Int}" page={ModuleModulePage} name="module" />
        <Route path="/modules" page={ModuleModulesPage} name="modules" />
      </Set>
      <Set wrap={ScaffoldLayout} title="ModuleDocumentAgreements" titleTo="moduleDocumentAgreements" buttonLabel="New ModuleDocumentAgreement" buttonTo="newModuleDocumentAgreement">
        <Route path="/module-document-agreements/new" page={ModuleDocumentAgreementNewModuleDocumentAgreementPage} name="newModuleDocumentAgreement" />
        <Route path="/module-document-agreements/{id:Int}/edit" page={ModuleDocumentAgreementEditModuleDocumentAgreementPage} name="editModuleDocumentAgreement" />
        <Route path="/module-document-agreements/{id:Int}" page={ModuleDocumentAgreementModuleDocumentAgreementPage} name="moduleDocumentAgreement" />
        <Route path="/module-document-agreements" page={ModuleDocumentAgreementModuleDocumentAgreementsPage} name="moduleDocumentAgreements" />
      </Set>
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={ScaffoldLayout} title="Organizations" titleTo="organizations" buttonLabel="New Organization" buttonTo="newOrganization">
        <Route path="/organizations/new" page={OrganizationNewOrganizationPage} name="newOrganization" />
        <Route path="/organizations/{id:Int}/edit" page={OrganizationEditOrganizationPage} name="editOrganization" />
        <Route path="/organizations/{id:Int}" page={OrganizationOrganizationPage} name="organization" />
        <Route path="/organizations" page={OrganizationOrganizationsPage} name="organizations" />
      </Set>
      <Private unauthenticated="login">
        <Set wrap={SiteLayout}>
          <Route path="/organization" page={OrganizationPage} name="organization" />
          <Route path="/marketplace" page={MarketplacePage} name="marketplace" />
          <Route path="/courses" page={CoursesPage} name="courses" />
          <Route path="/testing" page={TestingPage} name="testing" />
          <Route path="/home" page={HomePage} name="home" />
        </Set>
      </Private>
      <Route path="/login" page={LoginPage} name="login" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}*/

export default Routes
