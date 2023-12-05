import { AbilityBuilder, createMongoAbility } from '@casl/ability'


export default function defineAbilityFor(user) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    
    can('read', 'Article');

    if(user?.authenticated) {
        can('update', 'Article', { author_id: user.id });

        if(user.editor) {
            can('update', 'Article');
        }

        cannot('update', 'Article', { published: true });
    }
    return build();
}
