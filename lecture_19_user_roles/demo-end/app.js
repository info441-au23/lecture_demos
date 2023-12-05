import chalk from 'chalk';
import user from "./user.js";
import articles from './articles.js';
import defineAbilityFor from './abilities.js';

function permissionChecks(article, permFuncs) {
    console.log(`Permissions for Article '${article.title}':`);
    permFuncs.forEach((permFunc) => {
        const result = permFunc();
        if(result) {
            console.log(`   ${permFunc.toString()}: ${chalk.bold.cyanBright(result)}`);
        } else {
            console.log(`   ${permFunc.toString()}: ${chalk.bold.red(result)}`);
        }
    });
}

user.authenticated = true;

const ability = defineAbilityFor(user);

articles.forEach((article) => {
    permissionChecks(article, [
        () => ability.can('read', article),
        () => ability.can('update', article),
    ]);
    console.log('\n');
});
